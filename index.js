const express = require('express'),
      port = process.env.port || 4000,
      bodyParser = require('body-parser'),
      routes = require('./routes/routes'),
      cors = require('cors'),
      app = express();

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req , res)=>{
    res.json('API MIdas');
});

routes(app);

app.listen(port , ()=> {
    console.log(`Server Berjalan Di Port ${port}`);
})


