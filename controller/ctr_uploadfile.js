const db = require('../koneksi/koneksi'),
      global = require('../global_function/global_function');

exports.index = (req , res) =>{
    let id = req.params.id;
    db.select('*').from('VW_GROUPFILE')
      .where('vcidrepo',id)
      .then(data => {
          res.json(data);
      })
}

exports.listdetailfile = (req , res)=>{
    let id = req.params.id;
    db.select('*').from('VW_file')
      .where('vcidrepo',id)
      .then(data => {
          res.json(data);
      })
}

exports.sckategori = (req , res )=>{
    db.select('*').from('tbdc_repository').then(data =>{
        res.json(data);
    });
}

exports.save = (req , res) =>{
    let { name , file , jenis , ket} = req.body;
    db('tbdc_file')
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