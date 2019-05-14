const db = require('../koneksi/koneksi'),
      path = require('path'),
      fs = require('fs'),
      global = require('../global_function/global_function');


exports.listRepo = async (req , res)=>{
    let id = req.params.id;

    let data = await  db.select('*').from('vw_list_access_repository')
                        .where('id_user' , id);
    res.json(data);
}

exports.listformat = async (req , res)=>{
    let id = req.params.id;

    let data = await db.select('*').from('vw_list_format_laporan')
                       .where('id_repo' , id)
                       .orderBy('id_format','desc')
    res.json(data)
}
exports.index = async (req , res)=>{
    let id = req.params.id;

    let data = await db.select('*').from('vw_list_format_laporan')
                       .where({
                           id_repo: id,
                           active: 1
                       })
    res.json(data)
}

exports.save =  (req , res) =>{
    let {  name , blob , idrepo , iduser} = req.body;
    let files = req.files.files;

    let id = global.idRecord('FMFILE')+iduser;
    let DirectoryFile = global.urlfile+'format-file\\'+id+path.extname(name);
    

    return db('tbdc_format_file')
            .insert({
                vcidformatfile: id.trim(),
                vcidrepo: idrepo,
                vmxfile: blob,
                vcfilename: id+path.extname(name),
                vcoriginalname: name,
                vcsrcpath: 'format-file\\'+id+path.extname(name),
                vcentryby: iduser,
                dtentryby: new Date(),
                inflagactive: 1
            }).then(()=>{
                // global.authAzure.createFileFromLocalFile('midas','format-laporan',id+path.extname(name),`./File/${name}` ,(err ,result , response)=>{
                //     if (err) {
                //         console.log(err)
                //     }

                //     fs.unlinkSync(`./File/${name}`)
                // })  
                files.mv(DirectoryFile)
                res.json(true)    
            })  
}

exports.updateinflag = (req , res) =>{
    let { idrepo } = req.body;

    db.select('*').from('vw_list_format_laporan')
      .where({
          id_repo: idrepo,
          active: 1
      })
      .then(res=>{
        let count = res.length;
        
        if (count !== 0) {
            let id = res[0].ID_FORMAT;

            return db('tbdc_format_file')
                   .where('vcidformatfile' , id)
                   .update({
                       inflagactive: 0
                   }) 
        }
        
      })  

    res.json(true)
}

exports.Downloadfile = (req , res) => {
    let {id} = req.params;

    db.select('*').from('vw_list_format_laporan')
      .where('id_format' ,id)
      .then(data =>{
          if (data) {
            res.download(global.urlfile+data[0].PATH)
            // let col = data[0];
            // global.authAzure.getFileToLocalFile('midas','format-laporan', col.FILE_NAME ,`./File/${col.FILE_NAME}` ,(err , result , response)=>{
            //     if (err) {
            //         console.log(err)
            //     }
            //     res.download(`./File/${col.FILE_NAME}`)  
            // })
          }
      })
}

exports.Downloadfile2 = (req , res)=>{
    let {id} = req.params;

    db.select('*').from('vw_list_format_laporan')
      .where({
          id_repo: id,
          active: 1
      })
      .then(data =>{
          if (data) {
            res.download(global.urlfile+data[0].PATH)
            // let col = data[0];
            // global.authAzure.getFileToLocalFile('midas','format-laporan', col.FILE_NAME ,`./File/${col.FILE_NAME}` ,(err , result , response)=>{
            //     if (err) {
            //         console.log(err)
            //     }
            //     res.download(`./File/${col.FILE_NAME}`)  
            // })
          }
      })

}

exports.delete = (req , res)=>{
    // let {id} = req.params;

    // db.select('*').from('vw_list_format_laporan')
    //   .where('id_format' , id)
    //   .then(data =>{
    //       if (data) {
    //          let col = data[0];
    //          fs.unlinkSync(`./File/${col.FILE_NAME}`) 
    //          res.json(true)
    //       }
    //   })

    res.json(true)
}
