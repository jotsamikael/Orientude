const express = require('express')
const app = express();
const router = express.Router();
//mongoose
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router)
const bodyParser = require('body-parser')



mongoose.Promise = global.Promise;

mongoose.connect(config.uri, (err)=>{
    if (err){
        console.log('Could not connect to database: ', err)
    } else{
        console.log( 'secret is' +config.secret)
        console.log('connecté to database: '+config.db)
    }
})

mongoose.connect();

app.use(bodyParser.urlencoded({extended: false}))
//parse application/json
app.use(bodyParser.json());


app.use(express.static(__dirname + '/client-orientude/project-frontend/dist/'));
app.use('/authentication', authentication);



//client-orientude\dist\project-frontend\index.html
app.get('*',(req, res)=> {
    res.sendFile(path.join(__dirname + '/client-orientude/dist/project-frontend/index.html'));
  })
  
  app.listen(3000, ()=>{
      console.log('Listening on port 3000')
  })
  