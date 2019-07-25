const db = require('../koneksi/koneksi');
const path = require('path');
const  sql = require('mssql');
const { configsp  , idRecord , authAzure , urlfile , replace}   = require('../global_function/global_function');
const fs = require('fs');
      
      

exports.index = (req , res) =>{
    let { idrepo , idperiod } = req.params;
    
    new sql.ConnectionPool(configsp).connect().then(pool =>{
        return pool.request().query(`
                EXEC [dbo].[List_Group_File] 
                @idrepo = ${idrepo},
                @idperiod = ${idperiod};
        `).then(row =>{
            let  data = row.recordset;
            res.json(data)
        })
    })
}


exports.listdetailfile = (req , res)=>{
    let {idtemplate , idperiod} = req.params;

    return db.select('*').from('vw_file')
            .where('id_template' , idtemplate)
            .orderBy('status','desc')
            .then(data =>{
                let cek =  data[0].JENIS_REPO;
                    if (cek === 'Tahunan') {
                        return res.json(data)   
                    }else{
                        return db.select('*').from('VW_file')
                                .where({
                                    id_template : idtemplate,
                                    id_period: idperiod
                                })
                                .orderBy('status','desc')
                                .then(data => {
                                    return res.json(data);
                                })
                    }

            })
}

exports.listRepository = (req , res)=>{
    let {user , idperiod} = req.params;

    new sql.ConnectionPool(configsp).connect().then(pool =>{
        return pool.request().query(`EXEC [dbo].[List_Access_Repository] 
                                            @iduser = ${user},
                                            @period = ${idperiod}`).then(result =>{
                                                let rows = result.recordset;
                                                res.json(rows)
                                            })
    })
}


exports.save = (req , res)  =>{

    let file = req.files.file;
    let fileOrinalName = file.name;
    let = { description , template , idperiod ,period, directory, nodoc ,repo , blob ,user , sbu , dpt , tmpname} = req.body;
    
    db.select('*').from('vw_file')
      .where({
          id_template: template,
          id_period: idperiod
      })
      .then(res =>{
         let count = res.length;
         let nilai = '';
         
         if (count === 0) {
             nilai = 1;
         }else{
             nilai = count + 1;
         }

         let filetrim = nodoc+'-'+repo+'-'+period+'-'+'-'+tmpname+'-'+nilai+path.extname(fileOrinalName);
         let filename = replace(filetrim.trim());
         file.mv(`./File/${filename}`);
         let DirectoryFile = urlfile()+'mtg\\'+replace(sbu)+'\\'+replace(dpt)+'\\'+directory+'\\'+filename;
         let idrecord = idRecord('fl')+user;


       
         return db('tbdc_file')
                .insert({
                    vcidfile: idrecord.trim(),
                    vcidtmprepo: template,
                    dtupload: new Date(),
                    vcidaccperiod: idperiod,
                    vcdescription: description,
                    vmxfile: blob,
                    vcsrcpath: directory+'\\'+filename,
                    vcfilename: filename,
                    vcoriginalname: fileOrinalName,
                    vcentryby: user,
                    dtentryby: new Date(),
                    inflagactive: 1
                }).then(() =>{
                    authAzure.createBlockBlobFromLocalFile('midas',`mtg/${replace(sbu)}/${replace(dpt)}/${directory}/${filename}`, `./File/${filename}` ,(err ,result , response)=>{
                        if (err) {
                            console.log(err)
                        }

                        fs.unlinkSync(`./File/${filename}`);
                        file.mv(DirectoryFile)    
                    })    
                }).catch(err =>{
                    console.log(err)
                })
            
      })  

      res.json(true);
}

exports.updateinflag = (req , res) =>{
    let { template , idperiod } = req.body;

    db.select('*').from('vw_file')
      .where({
          id_template: template,
          id_period: idperiod,
          active: 1
      })
      .then(res=>{
        let count = res.length;

        if (count !== 0) {
            let id = res[0].ID_FILE;

            return db('tbdc_file')
                   .where('vcidfile' , id)
                   .update({
                       inflagactive: 0
                   }) 
        }
        
      })  

    res.json(true)
}

exports.Downloadfile = (req , res) => {
    let {id} = req.params;

    db.select('*').from('vw_file')
      .where('id_file' ,id)
      .then(data =>{
          if (data) {
            let hasil = data[0];
            res.download(`${urlfile()}mtg\\${replace(hasil.SBU)}\\${replace(hasil.DIVISION)}\\${hasil.DIRECTORY}\\${hasil.FILE_NAME}`)
            // let col = data[0];
            // global.authAzure.getFileToLocalFile('midas',col.DIRECTORY,col.FILE_NAME ,`./File/${col.FILE_NAME}` ,(err , result , response)=>{
            //     if (err) {
            //         console.log(err)
            //     }
            //     res.download(`./File/${col.FILE_NAME}`)  
            // })
          }
      })
}


exports.delete = (req , res)=>{
    let {id} = req.params;

    // db.select('*').from('vw_file')
    //   .where('id_file' , id)
    //   .then(data =>{
    //       if (data) {
    //          let col = data[0];
    //          fs.unlinkSync(`./File/${col.FILE_NAME}`) 
    //          res.json(true)
    //       }
    //   })
    res.json(true)
}
