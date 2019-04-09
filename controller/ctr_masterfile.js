const db = require('../koneksi/koneksi'),
      mugen = require('../koneksi/con_general'),
      global = require('../global_function/global_function'),
      mkdir = require('mkdirp');

exports.index = (req , res) =>{
    let {user}  = req.params

    db.select('*').from('vw_list_repository')
      .where('vcentryby',user)
      .then(data =>{
        res.json(data);
    });
}

exports.sbu = (req , res) =>{
    mugen.select('*').from('vw_list_sbu')
         .then(data =>{
            res.json(data)
         })
}

exports.divisi = (req , res) =>{
    let { id } = req.params;

    mugen.select('*').from('vw_list_division')
      .where('sbu_id', id)
      .then(data =>{
          res.json(data)
      })
}

exports.save = (req , res) =>{
    let { name , jenis , ket , user ,divisi , sbu} = req.body;
    let id  = global.idRecord('MST');

    db('tbdc_repository')
    .insert({
        vcidrepo: id,
        dtcreate: new Date(),
        vcdescription: name,
        vcjenisrepo: jenis,
        txket: ket,
        vcidsbu: sbu,
        vciddept: divisi,
        vcentryby: user,
        dtentryby: new Date()
    }).then(()=>{
        res.json(true);
        mkdir(global.urlfile+id)
    })
}