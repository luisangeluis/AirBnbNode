const multer = require('multer');
const path = require('path');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
// const upload = multer({ storage: storage })

const uploadAccomm = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('imgsAccomm/'))
    },
    filename: function (req, file, cb) {
      // cb(null, file.fieldname + '-' + Date.now())
      cb(null, Date.now()+'-'+ file.originalname)
    }
  })
  const upload = multer({ storage: storage })
  return upload;
}

// exports.upload = upload;

module.exports = {
  uploadAccomm
}
