const masterFile = require('../controller/ctr_masterfile');
const uploadFile = require('../controller/ctr_uploadfile');
const { accessMenu } = require('../controller/ctr_access_menu');
const global = require('../controller/ctr_global');
const accessrepo = require('../controller/cts_access_repo');
const formatfile = require('../controller/ctr_format_file');
const laporananalis = require('../controller/ctr_laporan_analisis');
const user = require('../controller/ctr_user');
const search = require('../controller/ctr_search_repo');
const chats = require('../controller/ctr_chats');

module.exports = (app)=>{


    /* User */

    app.route('/cekuser/:name').get(user.cekUser);
    app.route('/api/cekuser/:name').get(user.cekUser);
    app.route('/daftar').post(user.daftar);
    app.route('/api/daftarauth').post(user.daftarAuth);
    app.route('/api/usersby/:dpt').get(user.userbyDivision);
    app.route('/api/deluserbyid').delete(user.deletebyId);
    

    /* User */

    /* Access Menu */
    app.route('/api/accessmenu').get(accessMenu);

    /* Access Menu */

    /* API Global */

    app.route('/api/sbu').get(global.sbu);
    app.route('/api/dpt/:id').get(global.dpt);
    app.route('/sbu').get(global.sbu);
    app.route('/dpt/:id').get(global.dpt);
    app.route('/api/userFilter/:sbu/:dpt').get(global.userFilter);
    app.route('/api/accperiod').get(global.accperiod);
    app.route('/api/periodtoday').get(global.periodtoday);

    /* API Global */

    /* Master File */

    app.route('/api/repository').get(masterFile.index);
    app.route('/api/repository/user/:id').get(masterFile.listuser);
    app.route('/api/repository').post(masterFile.save);
    
    /* Master File */

    /* File Upload */

    app.route('/api/uploadfile/:idrepo/:idperiod').get(uploadFile.index);
    app.route('/api/uploadfiledetail/:idtemplate/:idperiod').get(uploadFile.listdetailfile);
    app.route('/api/uploadfile').post(uploadFile.save);
    app.route('/api/downloadfile/:id').get(uploadFile.Downloadfile);
    app.route('/api/deletefile/:id').get(uploadFile.delete);
    app.route('/api/uploadfile/repo/:user/:idperiod').get(uploadFile.listRepository);
    app.route('/api/uploadfile').put(uploadFile.updateinflag);

    /* File Upload */

    /* API User repo */

    app.route('/api/accessrepo/:id').get(accessrepo.listAccess);
    app.route('/api/accessrepo/repo/:id/:user').get(accessrepo.listRepo);
    app.route('/api/accessrepo').post(accessrepo.save);
    app.route('/api/accessrepo').delete(accessrepo.delete);


    /* API User repo */

    /* API Format File */
    app.route('/api/formatfile/:id').get(formatfile.listRepo);
    app.route('/api/formatfile/detail/:id').get(formatfile.listformat);
    app.route('/api/formatfile').post(formatfile.save);
    app.route('/api/formatfile').put(formatfile.updateinflag);
    app.route('/api/formatfile/download/:id').get(formatfile.Downloadfile);
    app.route('/api/formatfile/download2/:id').get(formatfile.Downloadfile2);
    app.route('/api/formatfile/delete/:id').get(formatfile.delete);
    app.route('/api/formatfile/index/:id').get(formatfile.index);
    /* API Format File */

    /* APi Laporan Analisi */

    app.route('/api/laporananalis/:iduser/:idperiod/:flag/:period/:dpt').get(laporananalis.List);
    app.route('/api/laporananalis/:flag/:idrepo/:idperiod').get(laporananalis.Listdetail);

    /* APi Laporan Analisi */

    /* Search Repo */

    app.route('/api/search/repo/:flag/:dpt').get(search.listReport);
    app.route('/api/search/file/:repo').get(search.ListFile);

    /* Search Repo */

    /* Chats */
    app.route('/api/chats/users').get(chats.listUsers)
    /* Chats */

}