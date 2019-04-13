const masterFile = require('../controller/ctr_masterfile');
const uploadFile = require('../controller/ctr_uploadfile');
const accessmenu = require('../controller/ctr_access_menu');
const global = require('../controller/ctr_global');
const accessrepo = require('../controller/cts_access_repo');

module.exports = (app)=>{


    /* Access Menu */
    app.route('/api/accessmenu').get(accessmenu.accessMenu);

    /* Access Menu */

    /* API Global */

    app.route('/api/sbu').get(global.sbu)
    app.route('/api/dpt/:id').get(global.dpt)
    app.route('/api/userFilter/:sbu/:dpt').get(global.userFilter);

    /* API Global */

    /* Master File */

    app.route('/api/repository').get(masterFile.index);
    app.route('/api/repository/user/:id').get(masterFile.listuser);
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

    /* API User repo */

    app.route('/api/accessrepo/:id').get(accessrepo.listAccess);
    app.route('/api/accessrepo/repo/:id').get(accessrepo.listRepo);
    app.route('/api/accessrepo').post(accessrepo.save);
    app.route('/api/accessrepo').delete(accessrepo.delete);


    /* API User repo */
}