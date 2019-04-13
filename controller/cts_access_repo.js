let db = require('../koneksi/koneksi');
let global = require('../global_function/global_function');


exports.listAccess = (req , res) =>{

    let {id} = req.params;
    db.select('*').from('vw_list_access_repository')
         .where('id_user',id)
         .then(data =>{
             res.json(data)
         })
}


exports.listRepo = (req , res) =>{
    let {id} = req.params;

    db.select('*').from('vw_list_repository')
      .where('id_dpt' ,id)
      .then(data =>{
          res.json(data)
      })
}

exports.delete = (req , res)=>{
    let {id} = req.body;


    return db('tbapp_access_repo')
           .where('vcidaccrepo', id)
           .del()
           .then(()=>{
               res.json(true)
           })
           .catch(err =>{
               console.log(err)
           })
}

exports.save = (req , res) =>{
    let {idrepo , iduser} = req.body;

    return db('tbapp_access_repo')
           .insert({
            vcidaccrepo: global.idRecord('ACCREPO'),
            vcidrepo: idrepo,
            vciduser: iduser,
            dtentryby: new Date()
           })
           .then(()=>{
               res.json(true)
           })
           .catch(err =>{
               console.log(err)
           })
}