const masterFile = require('../controller/ctr_masterfile');
const uploadFile = require('../controller/ctr_uploadfile');

module.exports = (app)=>{

    /* Master File */

    app.route('/repository').get(masterFile.index);
    app.route('/repository').post(masterFile.save);
    
    /* Master File */

    /* File Upload */

    app.route('/uploadfile/:id').get(uploadFile.index);
    app.route('/uploadsckategori').get(uploadFile.sckategori);
    app.route('/uploadfiledetail/:id/:dt').get(uploadFile.listdetailfile);
    app.route('/uploadfile').post(uploadFile.save);
    app.route('/downloadfile/:id').get(uploadFile.Downloadfile);
    /* File Upload */
}