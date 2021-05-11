const { transaction } = require('objection');
const dayjs = require('dayjs');

const { abort } = require('../../helpers/error');
const {
  User, Role, DepartmentUser, Position, Vacation, VacationHistory,
} = require('../../models');
const departmentUserRole = require('../../enums/departmentUserRole');
const workTypeStatus = require('../../enums/workType');
const userStatus = require('../../enums/userStatus');
const { formatYearMonthDay } = require('../../helpers/dayjs');

const USER_RESPONSE = ['users.id', 'email', 'full_name', 'tel', 'code', 'status', 'to_at', 'from_at', 'work_type', 'skill'];
// eslint-disable-next-line no-control-regex
const hasUnicode = (s) => /[^\u0000-\u007f]/.test(s);

exports.addUser = async ({
  email, fullName, locationId, roleId, fromAt, toAt, skill,
  workType, status, code, departmentIds, tel, positionId,
}) => {
  if (await User.hasEmail(email)) {
    abort(400, 'Email exists');
  }
  if (await User.hasCode(code)) {
    abort(400, 'Code exists');
  }

  if (!await Role.query().findOne({ id: roleId })) {
    abort(400, 'Role not exists');
  }

  if (!await Position.query().findOne({ id: positionId })) {
    abort(400, 'Position not exists');
  }

  const departments = departmentIds.map((id) => ({
    department_id: id,
    role: departmentUserRole.MEMBER,
  }));

  try {
    await transaction(User, async (UserTrx) => {
      const userObject = {
        email,
        tel,
        full_name: fullName,
        code,
        location_id: locationId,
        role_id: roleId,
        position_id: positionId,
        from_at: fromAt,
        to_at: toAt,
        work_type: workType,
        status,
        departments,
        skill,
      };

      if (workType === workTypeStatus.EMPLOYMENT) {
        userObject.vacations = {
          month: formatYearMonthDay(new Date(dayjs(new Date()).startOf('month'))),
          hours: 0,
        };

        userObject.vacationHistories = {
          note: 'Created User',
          current_hours: 0,
        };
      }

      await UserTrx.query().insertGraph(userObject);
    });
  } catch (e) {
    abort(400, 'Cannot Add New User');
  }
};

exports.updateUser = async ({
  id, email, fullName, locationId, roleId, fromAt, toAt, skill,
  workType, status, code, departmentIds, tel, positionId,
}) => {
  const user = await User.query().findOne({ id });

  if (!user) {
    abort(400, 'User not found');
  }

  if (!await User.canUpdateEmail(email, id)) {
    abort(400, 'Email exists');
  }
  if (!await User.canUpdateCode(code, id)) {
    abort(400, 'Code exists');
  }

  if (!await Role.query().findOne({ id: roleId })) {
    abort(400, 'Role not exists');
  }

  if (!await Position.query().findOne({ id: positionId })) {
    abort(400, 'Position not exists');
  }

  const oldDepartments = await DepartmentUser
    .query()
    .where({ user_id: id })
    .select('id', 'department_id', 'role');

  const departments = [];
  departmentIds.forEach((departmentId) => {
    const department = oldDepartments.find((el) => el.department_id === departmentId);
    if (department) departments.push(department);
    else departments.push({ department_id: departmentId, role: departmentUserRole.MEMBER });
  });

  const userObject = {
    id,
    email,
    full_name: fullName,
    tel,
    code,
    location_id: locationId,
    role_id: roleId,
    position_id: positionId,
    from_at: fromAt,
    to_at: toAt,
    work_type: workType,
    status,
    departments,
    skill,
  };

  try {
    await transaction(User, Vacation, VacationHistory, async (UserTrx, VacationsTrx, VacationHistoriesTrx) => {
      await UserTrx.query().upsertGraph(userObject);

      if (user.work_type !== Number(workType) && workType === workTypeStatus.EMPLOYMENT) {
        await VacationsTrx.knexQuery().insert({
          month: formatYearMonthDay(dayjs(new Date()).startOf('month')),
          hours: 0,
          user_id: user.id,
        }).onConflict(['user_id', 'month']).merge();

        await VacationHistoriesTrx.query().insert({
          note: 'Update User To Employment',
          current_hours: 0,
          user_id: user.id,
        });
      }
    });
  } catch (e) {
    abort(400, 'Cannot Update User');
  }
};

exports.getList = async (ids) => {
  const users = await User.query()
    .whereIn('id', ids)
    .select('id', 'email', 'full_name');
  return users;
};

exports.getUsers = async ({
  offset, limit, keyword, workType, roleId, positionId,
  departmentId, status, fromDate, toDate, sortBy, sortType,
}) => {
  let users;
  let total;

  users = User.query()
    .orderByRaw(`users.status = ${userStatus.ACTIVE} desc`)
    .orderBy(sortBy, sortType)
    .where((builder) => {
      if (hasUnicode(keyword)) {
        builder
          .where('full_name', 'like', `%${keyword}%`);
      } else {
        builder
          .where('email', 'like', `%${keyword}%`)
          .orWhere('full_name', 'like', `%${keyword}%`);
      }
    })
    .offset(offset)
    .limit(limit)
    .withGraphFetched('[location, role, departments.[department], position]')
    .modifyGraph('location', (builder) => {
      builder.select('id', 'title');
    })
    .modifyGraph('departments', (builder) => {
      builder.select('id');
    })
    .modifyGraph('departments.[department]', (builder) => {
      builder.select('id', 'title');
    })
    .modifyGraph('role', (builder) => {
      builder.select('id', 'name');
    })
    .modifyGraph('position', (builder) => {
      builder.select('id', 'name');
    })
    .select(...USER_RESPONSE);

  total = User.query()
    .where((builder) => {
      if (hasUnicode(keyword)) {
        builder
          .where('full_name', 'like', `%${keyword}%`);
      } else {
        builder
          .where('email', 'like', `%${keyword}%`)
          .orWhere('full_name', 'like', `%${keyword}%`);
      }
    })
    .count('users.id')
    .groupBy('users.id');

  if (workType) {
    users.where({ work_type: workType });
    total.where({ work_type: workType });
  }

  if (roleId) {
    users.where({ role_id: roleId });
    total.where({ role_id: roleId });
  }

  if (positionId) {
    users.where({ position_id: positionId });
    total.where({ position_id: positionId });
  }

  if (departmentId) {
    users
      .leftJoin('department_user', 'users.id', 'department_user.user_id')
      .where({ department_id: departmentId });
    total
      .leftJoin('department_user', 'users.id', 'department_user.user_id')
      .where({ department_id: departmentId });
  }

  if (status) {
    users.where({ status });
    total.where({ status });
  }

  if (fromDate) {
    users.where('from_at', '>=', fromDate);
    total.where('from_at', '>=', fromDate);
  }

  if (toDate) {
    users.where('from_at', '<=', toDate);
    total.where('from_at', '<=', toDate);
  }

  users = await users;
  total = await total;

  return {
    users,
    total: total.length,
    offset,
    limit,
    sortBy,
    sortType,
  };
};
