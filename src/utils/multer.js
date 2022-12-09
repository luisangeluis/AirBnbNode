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
  const time = Date.now();
  const today = new Date(time);
  const date  = today.toLocaleDateString().replace(/\//g,'-');
  
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('imgsAccomm/'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+'-'+Math.round(Math.random() * 10)+'-'+file.originalname)
      // cb(null,'file'+'-'+date+'-'+file.originalname)
    }
  })
  const upload = multer({ storage: storage })
  return upload;
}

// exports.upload = upload;

module.exports = {
  uploadAccomm
}
