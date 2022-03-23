const express = require('express')
const app = express()
//mongoose
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');



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

app.use(express.static(__dirname + '/client-orientude/project-frontend/dist/'));

//client-orientude\dist\project-frontend\index.html
app.get('*',(req, res)=> {
    res.sendFile(path.join(__dirname + '/client-orientude/dist/project-frontend/index.html'));
  })
  
  app.listen(3000, ()=>{
      console.log('Listening on port 3000')
  })
  