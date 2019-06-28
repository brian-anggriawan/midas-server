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

exports.ListUserChats = (req , res)=>{
    let { id } = req.params;

    db.select('*').from('VW_LIST_USER_CHAT')
      .where('from_id' , id)
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
        .orderBy('DATE' , 'asc')
        .then(data =>{
            res.json(data)
        })
}

exports.updateRead = ( req , res )=>{
    let { fromid , toid } = req.body;

    db('tbapp_chat_hd')
        .where({
            vcfrom: fromid,
            vcto: toid
        })
        .update({ inread: 0 })
        .then(()=>{
            res.json(true)
        })
}

