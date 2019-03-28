const db = require('../koneksi/koneksi'),
      global = require('../global_function/global_function'),
      fs = require('fs');
      

exports.index = (req , res) =>{
    let id = req.params.id;
    db.select('*').from('VW_GROUPFILE')
      .where('vcidrepo',id)
      .then(data => {
          res.json(data);
      })
}

exports.listdetailfile = (req , res)=>{
    let id = req.params.id,
        dt = req.params.dt
    db.select('*').from('VW_file')
      .where({
          vcidrepo: id

      })
      .then(data => {
          res.json(data);
      })
}

exports.sckategori = (req , res )=>{
    db.select('*').from('tbdc_repository').then(data =>{
        res.json(data);
    });
}

exports.save = (req , res)  =>{

    let con = [].concat(req.files.file);
    let count = con.length;

    if( count < 2){
        let file = req.files.file;
        let filename =  file.name;
        file.mv("./File/"+filename )

        let test = fs.readFileSync(file)

        return db('tbdc_file').insert({
            vcidfile: 'haloo2',
            vmxfile: test.toString('base64')
        }).then(data =>{
            res.json(true)
        })
    }else{
        for(let i = 0; i <= (count - 1); i++){

            let file = req.files.file[i];
            let filename =  file.name;
            file.mv("./File/"+filename )   
    }
}

}