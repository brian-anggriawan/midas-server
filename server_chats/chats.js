const db = require('../koneksi/koneksi');
const { idRecord } = require('../global_function/global_function');

module.exports = (io)=>{
    io.on('connection' ,(socket)=>{
        console.log('User Connected')

        /* Insert Chat into Database */ 
        socket.on('chat' , (msg)=>{

            db.select('*').from('tbapp_chat_hd')
              .where({
                  vcfrom: msg.FROM_ID,
                  vcto: msg.TO_ID
              })
              .then(data1 =>{
                    let count1 = Object.keys(data1).length;

                    if (count1 > 0) {
                        let idhd1 = data1[0].VCIDCHATHD;

                        db('tbapp_chat_dt')
                        .insert({
                            VCIDCHATDT: idRecord('chat'),
                            VCIDCHATHD: idhd1,
                            VCIDUSER: msg.FROM_ID,
                            VCMSG: msg.MSG,
                            DTCREATE: msg.DATE,
                            VCIPCREATE: msg.IP
                        })
                        .then(()=>{
                            console.log('Berhasil Menambahkan Detail 1')
                        })
                    }else{
                        let idCreate =  idRecord('chat');

                        db('tbapp_chat_hd')
                        .insert({
                            VCIDCHATHD: idCreate,
                            VCFROM: msg.FROM_ID,
                            VCTO: msg.TO_ID 
                        })
                        .then(()=>{
                            db('tbapp_chat_dt')
                            .insert({
                                VCIDCHATDT: idRecord('chat'),
                                VCIDCHATHD: idCreate,
                                VCIDUSER: msg.FROM_ID,
                                VCMSG: msg.MSG,
                                DTCREATE: msg.DATE,
                                VCIPCREATE: msg.IP
                            }).then(()=>{
                                console.log('Berhasil Menambahkan Detail 1')
                            })   
                        })
                    }


                    db.select('*').from('tbapp_chat_hd')
                        .where({
                            vcfrom: msg.TO_ID,
                            vcto: msg.FROM_ID
                        })
                        .then(data2 =>{
                            let count2 = Object.keys(data2).length;

                            if (count2 > 0) {
                                let idhd2 = data2[0].VCIDCHATHD;
                                let read = data2[0].INREAD;

                                db('tbapp_chat_dt')
                                .insert({
                                    VCIDCHATDT: idRecord('chat'),
                                    VCIDCHATHD: idhd2,
                                    VCIDUSER: msg.FROM_ID,
                                    VCMSG: msg.MSG,
                                    DTCREATE: msg.DATE,
                                    VCIPCREATE: msg.IP
                                })
                                .then(()=>{
                                    console.log('Berhasil Menambahkan Detail 2');

                                    db('tbapp_chat_hd')
                                    .where({
                                        VCIDCHATHD: idhd2,
                                    })
                                    .update({ inread: read + 1 })
                                    .then(()=>{
                                        console.log('Berhasil Menambahkan Read');
                                    })
                                })
                            }else{
                                let idCreate =  idRecord('chat');
        
                                db('tbapp_chat_hd')
                                .insert({
                                    VCIDCHATHD: idCreate,
                                    VCFROM: msg.TO_ID,
                                    VCTO: msg.FROM_ID,
                                    INREAD: 1
                                })
                                .then(()=>{
                                    db('tbapp_chat_dt')
                                    .insert({
                                        VCIDCHATDT: idRecord('chat'),
                                        VCIDCHATHD: idCreate,
                                        VCIDUSER: msg.FROM_ID,
                                        VCMSG: msg.MSG,
                                        DTCREATE: msg.DATE,
                                        VCIPCREATE: msg.IP
                                    }).then(()=>{
                                        console.log('Berhasil Menambahkan Detail 2')
                                    })   
                                })
                            }

                        })
                

                    io.emit('chat' , msg);
              })

        /* Insert Chat into Database */ 

            
        });

        socket.on('istyping' , (name)=>{
            io.emit('istyping' ,(name))
        });

        socket.on('disconnect' ,()=>{
            console.log('User Disconnect');
        });
    })
}