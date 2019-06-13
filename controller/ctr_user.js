const mugen = require('../koneksi/con_general');
const { idRecord } = require('../global_function/global_function');

exports.cekUser = ( req , res)=>{
    let { name } = req.params;

    mugen.select('*').from('tbgn_usrlogin')
         .where( 'vcusername' , name)
         .then( data =>{
             let count = Object.keys(data).length
             if (count !== 0 ) {
                return res.json(true)
             }else{
                 return res.json(false)
             }
         })
}

exports.daftar = ( req , res)=>{
    let { name , pas , dpt} = req.body;

    mugen('tbgn_usrlogin')
        .insert({
            vcidusrlogin: idRecord('user'),
            vcusername: name,
            vcpassword: pas,
            vciddepartment: dpt,
            inaccess: 3,
            dtentry: new Date()
        }).then(()=>{
            res.json(true)
        })


}

exports.daftarAuth = ( req , res)=>{
    let { name , pas , dpt , acc} = req.body;

    mugen('tbgn_usrlogin')
        .insert({
            vcidusrlogin: idRecord('user'),
            vcusername: name,
            vcpassword: pas,
            vciddepartment: dpt,
            inaccess: acc,
            dtentry: new Date()
        }).then(()=>{
            res.json(true)
        })


}

exports.userbyDivision = (req , res)=>{
    let { dpt } = req.params;

    mugen.select('*').from('vw_list_usrlogin')
            .where('iddpt', dpt)
            .then( data =>{
                res.json(data)
            })
}

exports.deletebyId = (req , res)=>{
    let { id } = req.body;

    mugen('tbgn_usrlogin')
        .where('vcidusrlogin' , id)
        .del()
        .then(()=>{
            res.json(true)
        })
}