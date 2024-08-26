import multer from "multer";

import __dirname from  '../utils.js';

const multerOptions = {
    storage: multer.diskStorage({
        destination:function(req,file,cb){
            return cb(null,`${__dirname}/public/img`)
        },
        filename:function(req,file,cb){
            return cb(null,`${Date.now()}-${file.originalname}`)
        },
    })
}

const uploader = multer(multerOptions);

export default uploader;