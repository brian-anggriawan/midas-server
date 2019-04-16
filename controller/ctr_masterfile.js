const db = require('../koneksi/koneksi'),
      global = require('../global_function/global_function'),
      mkdir = require('mkdirp');

exports.index = (req , res) =>{
    //let {user}  = req.params

    db.select('*').from('vw_list_repository')
      //.where('vcentryby',user)
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
    let { name , jenis , ket , user ,divisi , sbu ,nodoc} = req.body;
    let id  = global.idRecord('MST');
    let docname = `${nodoc}-${name}`;

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
                    vcidtmprepo: id+global.idRecord('TMPREPO')+i,
                    vcidrepo: id,
                    vcjenis: `HEK ${i}`,
                    vcentryby: user,
                    dtentryby: new Date()
                })  
            }
            return db('tbdc_template_repository').insert(data).then(()=>{
                    mkdir(global.urlfile+docname)
                    res.json(true)
            })

        }else if (jenis==='Mingguan') {
           let i = 1;
           let b = 4;
           let data = [];

           for(i; i <= b; i++){
                data.push({
                    vcidtmprepo: id+global.idRecord('TMPREPO')+i,
                    vcidrepo: id,
                    vcjenis: `Minggu ${i}`,
                    vcentryby: user,
                    dtentryby: new Date()   
                })
           }
           return db('tbdc_template_repository').insert(data).then(()=> {
                    mkdir(global.urlfile+docname)
                    res.json(true)
           });
            
        }else if(jenis==='Bulanan'){
            return db('tbdc_template_repository')
                   .insert({
                        vcidtmprepo: id+global.idRecord('TMPREPO'),
                        vcidrepo: id,
                        vcjenis: 'Bulan',
                        vcentryby: user,
                        dtentryby: new Date()
                   })
                   .then(()=>{
                        mkdir(global.urlfile+docname)
                        res.json(true)
                   })
        }else if (jenis === 'Tahunan') {
            return db('tbdc_template_repository')
            .insert({
                 vcidtmprepo: id+global.idRecord('TMPREPO'),
                 vcidrepo: id,
                 vcjenis: 'Tahun',
                 vcentryby: user,
                 dtentryby: new Date()
            })
            .then(()=>{
                mkdir(global.urlfile+docname)
                res.json(true)
            })  
        }
    })
}