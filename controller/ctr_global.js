let mugen = require('../koneksi/con_general');
let db = require('../koneksi/koneksi');


exports.sbu = (req , res)=>{
    mugen.select('*').from('vw_list_sbu')
         .then(data =>{
            res.json(data)
         })
}


exports.dpt = (req , res)=>{
    let { id } = req.params;

    mugen.select('*').from('vw_list_division')
         .where('sbu_id' , id)
         .then(data =>{
            res.json(data)
         })
}

exports.userFilter = (req , res)=>{
    let {sbu , dpt} = req.params;
    mugen.select('*').from('vw_list_usrlogin')
          .where({
              iddpt: dpt,
              sbu_id: sbu
          })
          .then(data =>{
              res.json(data)
          })
}

exports.accperiod = (req , res)=>{
    db.select('*').from('vw_accperiod_Select')
      .then(data =>{
          res.json(data)
      })
}

exports.periodtoday = (req , res) =>{
    db.select('*').from('vw_select_period')
      .then(data =>{
          res.json(data)
      })
}

exports.getIp = ( req , res)=>{
    let ip = req.ip.replace('::','').replace('ffff:' ,'');

    res.json(ip)
}