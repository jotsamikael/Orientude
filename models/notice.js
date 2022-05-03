const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



/*************** title validators ***********/

let titleLengthChecker = (title) =>{
    if(!title){
        return false
    } else{
        if(title.length < 2 || title.length> 30){
            return false;
        } else 
        {return true;}
       
    }
};

const titleValidators = [
   
    {
        validator: titleLengthChecker,
        message: 'title should be greater than 1 characters and should be less than 15'

    }

]



/*************** description validators ***********/

let descriptionLengthChecker = (description) =>{
    if(!description){
        return false
    } else{
        if(description.length < 2 || description.length> 500){
            return false;
        } else 
        {return true;}
       
    }
};

const descriptionValidators = [
  
    {
        validator: descriptionLengthChecker,
        message: 'description should be greater than 1 characters and should be less than 500'

    }

]

/*************** type validators ***********/

let typechecker = (type)=>{
    if(!type){
        return false;
    }
    else {
        if(type === "stage" || type ==="job"){
            return true;
        } else {
          return false;
        }
    } 
}


const typeValidators = [
   {
       validator: typechecker,
        message: 'type must be stage or job'
   } 
]



const Schema = mongoose.Schema;
const noticeSchema = new Schema({
    title: { type: String, required: true, validate: titleValidators},
    type: { type: String, required: true, validate: typeValidators},
    category: { type: String, required: true},
    description: { type: String, required: true, validate: descriptionValidators},
    createdBy: { type: String},
    createdAt: { type: Date, default: Date.now()},
    
});




module.exports = mongoose.model('Notice', noticeSchema)