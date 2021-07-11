const fs = require('fs');

const { abort } = require('../../helpers/error');

exports.getImage = ({ imgName }) => {
  const pathFile = `${process.cwd()}/uploads/${imgName}`;

  if (fs.existsSync(pathFile)) {
    return pathFile;
  }

  return abort(400, 'img is not already exists');
};
