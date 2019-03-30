const db = require('../koneksi/koneksi'),
      global = require('../global_function/global_function'),
      mkdir = require('mkdirp');

exports.index = (req , res) =>{
    db.select('*').from('tbdc_repository').then(data =>{
        res.json(data);
    });
}

exports.save = (req , res) =>{
    let { name , jenis , ket} = req.body;
    let id  = global.idRecord('MST');

    db('tbdc_repository')
    .insert({
        vcidrepo: id,
        dtcreate: new Date(),
        vcdescription: name,
        vcjenisrepo: jenis,
        txket: ket,
        dtentryby: new Date()
    }).then(()=>{
        res.json(true);
        mkdir(global.urlfile+id)
    })
}