const db = require('../koneksi/koneksi');
const path = require('path');
const  sql = require('mssql');
const { configsp  , idRecord , authAzure , replace , urlfile }   = require('../global_function/global_function');
const fs = require('fs');
const nodemailer = require('nodemailer');
      
      

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
    let = { description , template , idperiod ,period, directory, nodoc ,repo , blob ,user , sbu , dpt , tmpname , body  , tujuan , body } = req.body;
    let hasilTujuan = JSON.parse(tujuan);


    

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
                    vcsrcpath: `${directory}\\${filename}`,
                    vcfilename: filename,
                    vcoriginalname: fileOrinalName,
                    vcentryby: user,
                    dtentryby: new Date(),
                    inflagactive: 1,
                    txtbody: body
                }).then(() =>{
                    file.mv(DirectoryFile)  
                    authAzure.createBlockBlobFromLocalFile('midas',`mtg/${replace(sbu)}/${replace(dpt)}/${directory}/${filename}`, `./File/${filename}` ,(err ,result , response)=>{
                        if (err) {
                            console.log(err)
                        }else{
                           
                            if (hasilTujuan.length > 0) {
                               
                                let smtpTransport = nodemailer.createTransport({
                                    service: "hotmail",
                                    auth: {
                                    user: 'document@mustikatama.com',
                                    pass: 'R4hasiaedp'
                                    }
                                });

                                let listMail = [];

                                hasilTujuan.map( x =>{
                                    listMail.push(x.EMAIL)
                                });

                                console.log(listMail)
                                var mailOptions = {
                                            from: 'document@mustikatama.com',
                                            to: listMail,
                                            subject: description,
                                            text: body,
                                            attachments: [{'filename': filename, 'path': blob }]
                                        };
                                        
                                        smtpTransport.sendMail(mailOptions, function(err) {
                                            if (err) {
                                                console.log(err) 
                                            }
                                            console.log(`Pesan Terikirm ke ${listMail}`);
                                        });  
                            }
                        }

                        fs.unlinkSync(`./File/${filename}`);
                        
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
            let col = data[0];
            let directory = `mtg/${replace(col.SBU)}/${replace(col.DIVISION)}/${col.DIRECTORY}/${col.FILE_NAME}`
            authAzure.getBlobToLocalFile('midas',directory ,`./File/${col.FILE_NAME}` ,(err , result , response)=>{
                if (err) {
                    console.log(err)
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

    db.select('*').from('vw_file')
      .where('id_file' , id)
      .then(data =>{
          if (data) {
             let col = data[0];
             fs.unlinkSync(`./File/${col.FILE_NAME}`) 
             return res.json(true)
          }
      })
}
