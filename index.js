const express = require('express'),
      app = express(),
      port = process.env.port || 4000,
      bodyParser = require('body-parser'),
      routes = require('./routes/routes'),
      fileupload = require('express-fileupload'),
      jwt = require('jsonwebtoken'),
      exjwt = require('express-jwt'),
      jwtmw = exjwt({
        secret: 'brian wahyu'
      }),
      mugen = require('./koneksi/con_general'),
      cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cors());
app.use(fileupload());

/* Login */

app.post('/login' , (req , res)=>{
    let { name , pass } = req.body;

    mugen.select('*').from('vw_list_usrlogin')
         .where({
            USERNAME: name,
            PASSWORD: pass
         })
         .then(data =>{

            if (data.length > 0) {
                let token = jwt.sign({ id: data.IDLOGIN , username: data.USERNAME},'brian wahyu' ,{expiresIn: 129600});  
                res.json({
                    sucess: true,
                    token,
                    data
                })
            }else{
                res.json({
                    sucess: false
                })  
            }
         })
})


app.get('/data',(req , res)=>{
    mugen.select('*').from('vw_list_usrlogin')
         .then(data =>{
             res.json(data)
         })
})

/* Login */

app.get('/', (req , res)=>{
    res.json('Rest API Mustikatama Document Management System');
});

app.all('/api/*' , jwtmw);

app.use((err , req , res , next)=>{
    if (err.name === 'UnauthorizedError') {
        res.json({
            status: 'error',
            token: 'invalid',
            ket: 'Harus Login Dulu Goblok'
        })
    }else{
        next();
    }

});



routes(app);

app.listen(port , ()=> {
    console.log(`Server Berjalan Di Port ${port}`);
})


