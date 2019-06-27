const mugen = require('../koneksi/con_general');
const db = require('../koneksi/koneksi');

exports.listUsers = (req , res)=>{
    let { id } = req.params;

    mugen.select('*').from('vw_list_usrlogin')
         .whereNot('IDLOGIN', id )
         .orderBy('division' , 'asc')
         .then(data =>{
             res.json(data)
         });
}

exports.listChats = (req , res)=>{
    let { from , to } = req.params;

    db.select('*').from('vw_list_chat')
        .where({
            from_id: from,
            to_id: to
        })
        .then(data =>{
            res.json(data)
        })
}