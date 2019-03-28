const express = require('express'),
      app = express(),
      port = process.env.port || 4000,
      bodyParser = require('body-parser'),
      routes = require('./routes/routes'),
      fileupload = require('express-fileupload'),
      cors = require('cors');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use(cors());
app.use(fileupload());





app.get('/',(req , res)=>{
    res.json('API MIdas');
});

routes(app);

app.listen(port , ()=> {
    console.log(`Server Berjalan Di Port ${port}`);
})


