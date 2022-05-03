const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



/*************** name validators ***********/
let nameStructureChecker = (name) =>{
    if(!name){
        return false
    } else{
        const regEx = new RegExp(/^[a-z0-9_.]+$/);
            return  regEx.test(name)
    }
};



let nameLengthChecker = (name) =>{
    if(!name){
        return false
    } else{
        if(name.length < 2 || name.length> 30){
            return false;
        } else 
        {return true;}
       
    }
};

const nameValidators = [
    {
        validator: nameStructureChecker,
        message: 'name should not conatain spaces or special characters',
    },
    {
        validator: nameLengthChecker,
        message: 'name should be greater than 1 characters and should be less than 15'

    }

]



/*************** surname validators ***********/
let surnameStructureChecker = (surname) =>{
    if(!surname){
        return false
    } else{
        const regEx = new RegExp(/^[a-z0-9_.]+$/);
            return  regEx.test(surname)
    }
};



let surnameLengthChecker = (surname) =>{
    if(!surname){
        return false
    } else{
        if(surname.length < 2 || surname.length> 30){
            return false;
        } else 
        {return true;}
       
    }
};

const surnameValidators = [
    {
        validator: surnameStructureChecker,
        message: 'surname should not conatain spaces or special characters',
    },
    {
        validator: surnameLengthChecker,
        message: 'surname should be greater than 1 characters and should be less than 15'

    }

]






/***************** PHONE NUMBER CHECKER */
let phoneLengthChecker = (phone) =>{
    if(!phone){
        return false
    } else{
        if(phone.length < 5 || phone.length> 15){
            return false;
        } else 
        {return true;}
       
    }
};

const phoneValidators = [
    {
        validator: phoneLengthChecker,
        message: 'Phone number should be between 5 and 15 characters',
    }
    
]


const Schema = mongoose.Schema;
const applicationSchema = new Schema({
    name: {type: String, required: true, lowercase: true, validate: nameValidators},
    surname: {type: String, required: true, lowercase: true, validate: surnameValidators},
    phone: {type: String, required: true, validate: phoneValidators},
    cvFile: {type: String, required: true},
    createdBy: { type: String},
    noticeId: { type: String }
    
});




module.exports = mongoose.model('Application', applicationSchema)