const masterFile = require('../controller/ctr_masterfile');
const uploadFile = require('../controller/ctr_uploadfile');

module.exports = (app)=>{

    /* Master File */

    app.route('/api/repository').get(masterFile.index);
    app.route('/api/repository').post(masterFile.save);
    
    /* Master File */

    /* File Upload */

    app.route('/api/uploadfile/:id').get(uploadFile.index);
    app.route('/api/uploadsckategori').get(uploadFile.sckategori);
    app.route('/api/uploadfiledetail/:id/:dt').get(uploadFile.listdetailfile);
    app.route('/api/uploadfile').post(uploadFile.save);
    app.route('/api/downloadfile/:id').get(uploadFile.Downloadfile);
    app.route('/api/kategoribyid/:id').get(uploadFile.kategoriByid);
    /* File Upload */
}