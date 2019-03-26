const db = require('../koneksi/koneksi'),
      global = require('../global_function/global_function');

exports.index = (req , res) =>{
    db.select('*').from('tbdc_repository').then(data =>{
        res.json(data);
    });
}

exports.save = (req , res) =>{
    let { name , file , jenis , ket} = req.body;
    db('tbdc_repository')
    .insert({
        vcidrepo: global.idRecord('MST'),
        dtcreate: new Date(),
        vcdescription: name,
        vcstandartfilename: file,
        vcjenisrepo: jenis,
        txket: ket,
        dtentryby: new Date()
    }).then(()=>{
        res.json(true);
    })
}