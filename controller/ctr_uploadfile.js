const db = require('../koneksi/koneksi'),
      global = require('../global_function/global_function'),
      fs = require('fs');
      
      

exports.index = (req , res) =>{
    let id = req.params.id;
    db.select('*').from('VW_GROUPFILE')
      .where('vcidrepo',id)
      .then(data => {
          res.json(data);
      })
}

exports.listdetailfile = (req , res)=>{
    let id = req.params.id,
        dt = req.params.dt
    db.select('*').from('VW_file')
      .where({
          vcidrepo: id,
          dtperiod: dt
      })
      .orderBy('dtperiod','desc')
      .then(data => {
          res.json(data);
      })
}

exports.sckategori = (req , res )=>{
    db.select('*').from('tbdc_repository').then(data =>{
        res.json(data);
    });
}

exports.save = (req , res)  =>{

    let file = req.files.file;
    let fileOrinalName = file.name;
    let = { description , kategori , tanggal} = req.body;
    let DirectoryFile = "\\\\192.168.40.225\\midas-doc\\"+fileOrinalName;


    return db('tbdc_file')
            .insert({
                vcidfile: global.idRecord('FL'),
                vcidrepo: kategori,
                dtupload: new Date(),
                dtperiod: global.formatDate(tanggal),
                vcdescription: description,
                vcsrcpath: DirectoryFile,
                vcoriginalname: fileOrinalName,
                dtentryby: new Date() 
            }).then(data =>{
        
                file.mv(DirectoryFile);
                res.json(true)
                
            }).catch(err =>{
                console.log(err)
            })

}

exports.Downloadfile = (req , res) => {
    let {id} = req.params;
    let DirectoryFile = "\\\\192.168.40.225\\midas-doc\\";

    db.select('*').from('tbdc_file')
      .where('vcidfile' ,id)
      .then(data =>{
          if (data) {
            res.download(DirectoryFile+data[0].VCORIGINALNAME)
          }
      })

}
