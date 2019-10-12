const con = require('../koneksi/koneksi');

exports.listHeader = ( req , res )=>{
    con.select('*').from('vw_list_header_receiver')
       .then(data =>{
            return res.json(data)
       })
}

exports.postHeader = (req , res)=>{
    con('tbdc_receiver_hd')
        .insert(req.body)
        .then(()=>{
            return res.json(true)
        });
}

exports.postDetail = ( req , res )=>{
    con('tbdc_receiver_dt')
        .insert(req.body)
        .then(()=>{
            return res.json(true)
        });
}

exports.putHeader = ( req , res )=>{
    let { VCIDRECEIVERHD } = req.body;

    con('tbdc_receiver_hd')
        .where('vcidreceiverhd' , VCIDRECEIVERHD)
        .update(req.body)
        .then(()=>{
            return res.json(true);
        });
}

exports.delHeader = ( req , res )=>{
    let { vcidreceiverhd } = req.body;
    con('tbdc_receiver_hd')
        .where('vcidreceiverhd' , vcidreceiverhd)
        .del()
        .then(()=>{
            return res.json(true)
        });

}

exports.delDetail = ( req , res )=>{
    let { vcidreceiverdt } = req.body;
    con('tbdc_receiver_dt')
        .where('vcidreceiverdt' , vcidreceiverdt)
        .del()
        .then(()=>{
            return res.json(true)
        });

}

exports.listByReport = ( req , res )=>{
    let { id } = req.params;

    con.select('*').from('vw_list_detail_receiver')
        .where('id_report' , id)
        .then(data =>{
            return res.json(data)
        });
}

exports.listByReceiver = ( req , res )=>{
    let { id } = req.params;

    con.select('*').from('vw_list_detail_receiver')
        .where('id_hd' , id)
        .then(data =>{
            return res.json(data)
        });
}