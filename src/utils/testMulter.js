const multer = require('multer');

const upload = multer({
  dest: 'imgsAccomm',

})

exports.upload = upload;