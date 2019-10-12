const mugen = require('../koneksi/con_general');

exports.editProfile = ( req , res ) =>{
    let { vcidusrlogin } = req.body;

    mugen('TBGN_USRLOGIN')
        .where('vcidusrlogin' , vcidusrlogin)
        .update(req.body)
        .then(()=>{
            res.json(true);
        })
}