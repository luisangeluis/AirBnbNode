const multer =require('multer');
const path =require('path');

// const storage =multer.diskStorage({
//   destination:(req,file,cb)=>{
//     cb(null,path.resolve('uploads/'))
//   },
//   filename:(req,file,cb)=>{
//     cb(null,Date.now()+'-'+file.originalname)
//   }
// })

// const upload =multer({storage});

// exports.upload =upload;



const usersMulter =()=>{
  const storageUserImg =multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,path.resolve('uploads/'))
    },
    filename:(req,file,cb)=>{
      cb(null,Date.now()+'-'+file.originalname)
    }
  })
  
  const uploadUserImg =multer({storageUserImg});
  
  return uploadUserImg;
}


const accommodationsMulter =()=>{
  const storageAccommImg =multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,path.resolve('uploadsImgsAccomm/'))
    },
    filename:(req,file,cb)=>{
      cb(null,Date.now()+'-'+file.originalname)
    }
  })

  const uploadAccommImg =multer({storageAccommImg});
  return uploadAccommImg;

}

module.exports={
  usersMulter,
  accommodationsMulter
}

