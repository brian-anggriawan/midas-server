const mugen = require('../koneksi/con_general');


exports.listUsers = (req , res)=>{
    mugen.select('*').from('vw_list_usrlogin')
         .orderBy('division' , 'asc')
         .then(data =>{
             res.json(data)
         });
}