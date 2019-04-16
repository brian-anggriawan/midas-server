const db = require('../koneksi/koneksi'),
      path = require('path'),
      sql = require('mssql'),
      global = require('../global_function/global_function');
      
      

exports.index = (req , res) =>{
    let { idrepo , idperiod } = req.params;
    
    new sql.ConnectionPool(global.configsp).connect().then(pool =>{
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

    db.select('*').from('VW_file')
      .where({
          id_template : idtemplate,
          id_period: idperiod
      })
      .orderBy('status','desc')
      .then(data => {
          res.json(data);
      })
}

exports.listRepository = (req , res)=>{
    let {user , idperiod} = req.params;

    new sql.ConnectionPool(global.configsp).connect().then(pool =>{
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
    let = { description , template , idperiod ,period, directory, nodoc ,repo , blob ,user} = req.body;

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

         let filename = nodoc+'-'+repo+'-'+period+'-'+nilai+path.extname(fileOrinalName);
         let DirectoryFile = global.urlfile+directory+'\\'+filename;

         return db('tbdc_file')
                .insert({
                    vcidfile: global.idRecord('FL'),
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
                }).then(data =>{

                    file.mv(DirectoryFile);   
                    
                }).catch(err =>{
                    console.log(err)
                })
        
      })  
      res.json(true)
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
            res.download(global.urlfile+data[0].PATH)
          }
      })
}
