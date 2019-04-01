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
      cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cors());
app.use(fileupload());

let user = [
    {
        id: 1,
        name: 'brian',
        password: '1234'
    }
]

/* Login */

app.post('/login' , (req , res)=>{
    let { name , pass } = req.body;
    let data = user[0];

    if (data.name === name && data.password === pass) {
        let token = jwt.sign({ id: data.id , username: data.name},'brian wahyu' ,{expiresIn: 129600});
        res.json({
            sucess: true,
            token
        })

        console.log(token)
    }else{
        res.json({
            sucess: false
        })
    }

})


/* Login */

app.get('/', jwtmw,(req , res)=>{
    res.json('API MIdas');
});

app.all('*' , jwtmw);

app.use((err , req , res , next)=>{
    if (err.name === 'UnauthorizedError') {
        res.json({
            status: 'error',
            token: 'invalid'
        })
    }else{
        next();
    }

});



routes(app);

app.listen(port , ()=> {
    console.log(`Server Berjalan Di Port ${port}`);
})


