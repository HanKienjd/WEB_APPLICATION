"use strict";

var fs = require('fs');

var _require = require('../../helpers/error'),
    abort = _require.abort;

exports.getImage = function (_ref) {
  var imgName = _ref.imgName;
  var pathFile = "".concat(process.cwd(), "/uploads/").concat(imgName);

  if (fs.existsSync(pathFile)) {
    return pathFile;
  }

  return abort(400, 'img is not already exists');
};