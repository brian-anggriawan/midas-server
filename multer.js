let   multer = require('multer'),
      penyimpanan = multer.diskStorage({
        destination: function (req , file , cb) {
            cb(null ,'File/')
        },
        filename: function (req , file , cb) {
            cb(null ,file.originalname)
        }
      }),
      upload = multer({
        storage:penyimpanan
      });

      module.exports = upload;