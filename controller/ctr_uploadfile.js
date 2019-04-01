const db = require('../koneksi/koneksi'),
      path = require('path'),
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
    let = { description , kategori , tanggal , blob} = req.body;

    console.log(file)
    /*
    db.select('*').from('vw_file')
      .where('vcidrepo',kategori)
      .then(res =>{
         let count = res.length;
         let nilai = '';
         
         if (count === 0) {
             nilai = 1;
         }else{
             nilai = count + 1;
         }

         let filename = kategori+'_'+nilai+path.extname(fileOrinalName);
         let DirectoryFile = global.urlfile+kategori+'\\'+filename;


         return db('tbdc_file')
                .insert({
                    vcidfile: global.idRecord('FL'),
                    vcidrepo: kategori,
                    dtupload: new Date(),
                    dtperiod: global.formatDate(tanggal),
                    vcdescription: description,
                    vmxfile: blob,
                    vcsrcpath: DirectoryFile,
                    vcfilename: filename,
                    vcoriginalname: fileOrinalName,
                    dtentryby: new Date() 
                }).then(data =>{
            
                    file.mv(DirectoryFile);
                    
                }).catch(err =>{
                    console.log(err)
                })
    
      })
*/
      res.json(true)    
  
}

exports.Downloadfile = (req , res) => {
    let {id} = req.params;

    db.select('*').from('tbdc_file')
      .where('vcidfile' ,id)
      .then(data =>{
          if (data) {
            res.download(global.urlfile+data[0].VCIDREPO+'//'+data[0].VCFILENAME)
          }
      })

}
