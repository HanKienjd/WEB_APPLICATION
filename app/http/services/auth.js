const axios = require('axios');
const { abort } = require('../../helpers/error');

const { User, PolicyRole } = require('../../models');
const jwt = require('../../helpers/jwt');

const signInWithGoogle = async (providerAccessToken) => {
  try {
    const { data } = await axios(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${providerAccessToken}`);
    const { email } = data;
    if (!email) {
      abort(401, 'Fail To Login With Google');
    }
    const user = await User.query().findOne({ email });
    if (!user) {
      abort(401, 'Please make sure this email was registered');
    }
    const accessToken = jwt.generate({ userId: user.id });

    return {
      user,
      accessToken,
    };
  } catch (e) {
    return abort(401, 'Fail To Login With Google');
  }
};

const signInWithMicrosoft = async (providerAccessToken) => {
  try {
    const { data } = await axios('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${providerAccessToken}`,
      },
    });
    const { mail: email } = data;
    if (!email) {
      abort(401, 'Fail To Login With Microsoft');
    }

    const user = await User.query().findOne({ email });
    if (!user) {
      abort(401, 'Please make sure this email was registered');
    }
    const accessToken = jwt.generate({ userId: user.id });

    return {
      user,
      accessToken,
    };
  } catch (e) {
    return abort(401, 'Fail To Login With Microsoft');
  }
};

exports.signIn = async ({ providerAccessToken, providerName }) => {
  if (providerName === 'MICROSOFT') {
    const user = await signInWithMicrosoft(providerAccessToken);
    return user;
  } if (providerName === 'GOOGLE') {
    const user = await signInWithGoogle(providerAccessToken);
    return user;
  }

  return abort(400, 'Can\'t sign in with this provider');
};

exports.me = async (req) => {
  const userRole = req.user.role_id;
  const policyRoles = await PolicyRole
    .query()
    .where('role_id', userRole)
    .withGraphFetched('policy');

  const permissions = policyRoles.map((policyRole) => policyRole.policy.permission);

  const responseData = {
    id: req.user.id,
    full_name: req.user.full_name,
    work_type: req.user.work_type,
    permissions,
  };

  return responseData;
};
