const db = require('../koneksi/koneksi');



exports.accessMenu = (req , res)=>{
    db.select('*').from('vw_access_menu')
      .then(data =>{
        res.json(data)
      })
}