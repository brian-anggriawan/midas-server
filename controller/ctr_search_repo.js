const db = require('../koneksi/koneksi');


exports.listReport = ( req , res)=>{
    let { flag , dpt} = req.params;

    if (flag === '2') {
        db.select('*').from('vw_list_repository')
            .where('id_dpt' , dpt)
            .then(data =>{
                res.json(data)
            })
    }else{
        db.select('*').from('vw_list_repository')
        .then(data =>{
            res.json(data)
        });
    }
    
}

exports.ListFile = (req , res)=>{
    let { repo } = req.params;

    db.select('*').from('vw_file')
        .where('REPO','like',`%${repo}%`)
        .andWhere('ACTIVE' , 1)
        .orderBy('DTUPLOAD' ,'desc')
        .then(data =>{
            res.json(data)
        })
}