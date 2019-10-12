const db = require('../koneksi/koneksi');
const path = require('path');
const {  idRecord , authAzure , urlfile  } = require('../global_function/global_function');
const fs = require('fs');


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
    let {  name , blob , idrepo , iduser , dir} = req.body;
    let files = req.files.files;

    let id = idRecord('fmfile')+iduser;
    let fileName = id+path.extname(name);
    let DirectoryFile = urlfile()+'format-file\\'+id+path.extname(name);
    
    files.mv(`./File/${fileName}`);

    return db('tbdc_format_file')
            .insert({
                vcidformatfile: id.trim(),
                vcidrepo: idrepo,
                vmxfile: blob,
                vcfilename: fileName,
                vcoriginalname: name,
                vcsrcpath: DirectoryFile,
                vcentryby: iduser,
                dtentryby: new Date(),
                inflagactive: 1
            }).then(()=>{
                files.mv(DirectoryFile);
                authAzure.createBlockBlobFromLocalFile('midas',`format-file/${fileName}`,`./File/${fileName}` ,(err ,result , response)=>{
                    if (err) {
                        console.log(err)
                    }

                    fs.unlinkSync(`./File/${fileName}`);
                })  
                res.json(true);    
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
            let col = data[0];
            authAzure.getBlobToLocalFile('midas',`format-file/${col.FILE_NAME}`,`./File/${col.FILE_NAME}` ,(err , result , response)=>{
                if (err) {
                    console.log(err);
                    
                }
                let buffer = fs.readFileSync(`./File/${col.FILE_NAME}`);
                let bufferBase64 = Buffer.from(buffer);
                res.json(bufferBase64);
               
            })
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
            let col = data[0];
            authAzure.getBlobToLocalFile('midas',`format-file/${col.FILE_NAME}`,`./File/${col.FILE_NAME}` ,(err , result , response)=>{
                if (err) {
                    console.log(err);
                    
                }
                let buffer = fs.readFileSync(`./File/${col.FILE_NAME}`);
                let bufferBase64 = Buffer.from(buffer);
                res.json(bufferBase64);
               
            })
          }
      })

}

exports.delete = (req , res)=>{
    let {id} = req.params;

    db.select('*').from('vw_list_format_laporan')
      .where('id_format' , id)
      .then(data =>{
          if (data) {
             let col = data[0];
             fs.unlinkSync(`./File/${col.FILE_NAME}`) 
             return res.json(true)
          }
      })
}
