const db = require('../koneksi/koneksi');
const { idRecord , smbClient , replace , urlfile } = require('../global_function/global_function');
const mkdir = require('mkdirp');



exports.index = (req , res) =>{

    db.select('*').from('vw_list_repository')
      .then(data =>{
        res.json(data);
    });
}

exports.listuser = (req , res)=>{
    let {id} = req.params;

    db.select('*').from('vw_list_access_repository')
      .where('ID_REPO' , id)
      .then(data =>{
          res.json(data)
      })
}

exports.save = (req , res) =>{
    let { name , jenis , ket , user ,divisi , sbu ,nodoc , sbuname , divname} = req.body;
    let id  = idRecord('mst');
    let repository = `${nodoc}-${name}`;
    let docname = replace(repository.trim());
    let os = process.platform;
    let dirWin = `\\mtg\\${replace(sbuname)}\\${replace(divname)}\\`;


    db('tbdc_repository')
    .insert({
        vcidrepo: id,
        dtcreate: new Date(),
        vcdescription: name,
        vcjenisrepo: jenis,
        txket: ket,
        vcidsbu: sbu,
        vciddept: divisi,
        vcnodoc: nodoc,
        vcdirectory: docname,
        vcentryby: user,
        dtentryby: new Date()
    }).then(()=>{
        
        if (jenis ==='Harian') {
            let i = 1;
            let b = 25;
            let data = [];   

            for(i; i <= b; i++){
                data.push({
                    vcidtmprepo: idRecord('tmprepo')+i,
                    vcidrepo: id,
                    vcjenis: `HEK ${i}`,
                    vcentryby: user,
                    dtentryby: new Date()
                })  
            }
            return db('tbdc_template_repository').insert(data).then(()=>{

                if (os === 'win32' || os ==='win64') {
                    mkdir(`${urlfile()}${dirWin}${docname}`);
                 }else if(os ==='linux'){
                    smbClient.mkdir(`mtg/${docname}` ,function(err){
                        return console.log(err)
                    });
                 }
 
                 return res.json(true)
            })

        }else if (jenis==='Mingguan') {
           let i = 1;
           let b = 4;
           let data = [];

           for(i; i <= b; i++){
                data.push({
                    vcidtmprepo: idRecord('tmprepo')+i,
                    vcidrepo: id,
                    vcjenis: `Minggu ${i}`,
                    vcentryby: user,
                    dtentryby: new Date()   
                })
           }
           return db('tbdc_template_repository').insert(data).then(()=> {
                if (os === 'win32' || os ==='win64') {
                    mkdir(`${urlfile()}${dirWin}${docname}`);
                }else if(os ==='linux'){
                    smbClient.mkdir(`mtg/${docname}` ,function(err){
                        return console.log(err)
                    });
                }

                return res.json(true)
           });
            
        }else if(jenis==='Bulanan'){
            return db('tbdc_template_repository')
                   .insert({
                        vcidtmprepo: idRecord('tmprepo'),
                        vcidrepo: id,
                        vcjenis: 'Bulan',
                        vcentryby: user,
                        dtentryby: new Date()
                   })
                   .then(()=>{
                        if (os === 'win32' || os ==='win64') {
                            mkdir(`${urlfile()}${dirWin}${docname}`);
                        }else if(os ==='linux'){
                            smbClient.mkdir(`mtg/${docname}` ,function(err){
                                return console.log(err)
                            });
                        }
        
                        return res.json(true)
                   })
        }else if (jenis === 'Tahunan') {
            return db('tbdc_template_repository')
            .insert({
                 vcidtmprepo: idRecord('tmprepo'),
                 vcidrepo: id,
                 vcjenis: 'Tahun',
                 vcentryby: user,
                 dtentryby: new Date()
            })
            .then(()=>{
                if (os === 'win32' || os ==='win64') {
                    mkdir(`${urlfile()}${dirWin}${docname}`);
                 }else if(os ==='linux'){
                    smbClient.mkdir(`mtg/${docname}` ,function(err){
                        return console.log(err)
                    });
                 }
 
                 return res.json(true)
            })  
        }else if(jenis === 'Insidentil' ){
            let i = 1;
            let b = 25;
            let data = [];   

            for(i; i <= b; i++){
                data.push({
                    vcidtmprepo: idRecord('tmprepo')+i,
                    vcidrepo: id,
                    vcjenis: `HEK ${i}`,
                    vcentryby: user,
                    dtentryby: new Date()
                })  
            }
            return db('tbdc_template_repository').insert(data).then(()=>{
                if (os === 'win32' || os ==='win64') {
                    mkdir(`${urlfile()}${dirWin}${docname}`);
                 }else if(os ==='linux'){
                    smbClient.mkdir(`mtg/${docname}` ,function(err){
                        return console.log(err)
                    });
                 }
 
                 return res.json(true)
            })   
        }
    })
}