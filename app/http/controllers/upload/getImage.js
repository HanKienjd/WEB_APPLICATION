const uploadService = require('../../services/upload');

async function getList(req, res) {
  const { imgName } = req.params;

  const image = await uploadService.getImage({ imgName });

  return res.status(200).sendFile(image);
}

module.exports = getList;
