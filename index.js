const express = require('express')
const app = express();
const router = express.Router();
//mongoose
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const schoolRoute = require('./routes/schoolRoute')(router);


const authentication = require('./routes/authentication')(router);
const noticeRoute = require('./routes/noticeRoute')(router);
const applicationRoute = require('./routes/applicationRoute')(router);


const interviewRoute = require('./routes/interviewRoute')(router);


const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 3000;


mongoose.Promise = global.Promise;

mongoose.connect(config.uri, (err)=>{
    if (err){
        console.log('Could not connect to database: ', err)
    } else{
       // console.log( 'secret is' +config.secret)
        console.log('connecté to database: '+config.db)
    }
})

mongoose.connect();
 
    
//Middleware


app.use(cors({
  origin: 'http://localhost:4200'
}))


app.use(bodyParser.urlencoded({extended: false}))
//parse application/json
app.use(bodyParser.json());


//app.use(express.static(__dirname + '/client-orientude/project-frontend/dist/'));
app.use('/schoolRoute', schoolRoute);

app.use('/authentication', authentication);
app.use('/noticeRoute', noticeRoute)
app.use('/applicationRoute', applicationRoute)


app.use('/interviewRoute', interviewRoute);




//client-orientude\dist\project-frontend\index.html
/*app.get('*',(req, res)=> {
    res.sendFile(path.join(__dirname + '/client-orientude/dist/project-frontend/index.html'));
  })*/
  
  app.listen(port, ()=>{
      console.log('Listening on port'+ port)
  })
  