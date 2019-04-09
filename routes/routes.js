const masterFile = require('../controller/ctr_masterfile');
const uploadFile = require('../controller/ctr_uploadfile');
const accessmenu = require('../controller/ctr_access_menu');

module.exports = (app)=>{


    /* Access Menu */
    app.route('/api/accessmenu').get(accessmenu.accessMenu);

    /* Access Menu */

    /* Master File */

    app.route('/api/repository/:user').get(masterFile.index);
    app.route('/api/repository/sbu/sbu').get(masterFile.sbu);
    app.route('/api/repository/dpt/:id').get(masterFile.divisi);
    app.route('/api/repository').post(masterFile.save);
    
    /* Master File */

    /* File Upload */

    app.route('/api/uploadfile/:id').get(uploadFile.index);
    app.route('/api/uploadsckategori/:user').get(uploadFile.sckategori);
    app.route('/api/uploadfiledetail/:id/:dt').get(uploadFile.listdetailfile);
    app.route('/api/uploadfile').post(uploadFile.save);
    app.route('/api/downloadfile/:id').get(uploadFile.Downloadfile);
    app.route('/api/kategoribyid/:id').get(uploadFile.kategoriByid);
    app.route('/api/uploadfile/repo/:user').get(uploadFile.listRepository);
    /* File Upload */
}