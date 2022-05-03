const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

/*************** Email validators ***********/

let emailLengthChecker = (email)=>{
    if(!email){
        return false;
    }
    else {
        if(email.length < 6 || email.length> 30){
            return false;
        } else {
          return true;
        }
    } 
}
//email structure checker with regEx
 let emailStructureChecker = (email) =>{
     if(!email){
         return false
     } else{
         const regEx = new RegExp(/^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i)
           return regEx.test(email) //returns either true or false
     }
 }



const emailValidators = [
   {
       validator: emailLengthChecker,
        message: 'Email must be more than 5 character but less than 30'
   } ,
   {
    validator: emailStructureChecker,
     message: 'Email is not valid'
} 
]


let briefDescLengthChecker = (briefDesc)=>{
    if(!briefDesc){
        return false;
    }
    else {
        if(briefDesc.length < 20 || briefDesc.length> 1000){
            return false;
        } else {
          return true;
        }
    } 
}


const briefDescValidators = [
   {
       validator: briefDescLengthChecker,
        message: 'Description must be more than 20 character but less than 1000'
   } ,

]



/*************** title validators ***********/

let nameSchoolLengthChecker = (nameSchool)=>{
    if(!nameSchool){
        return false;
    }
    else {
        if(nameSchool.length < 3 || nameSchool.length> 60){
            return false;
        } else {
          return true;
        }
    } 
}
//nameSchool structure checker with regEx
 let nameSchoolStructureChecker = (nameSchool) =>{
     if(!nameSchool){
         return false
     } else{
         const regEx = new RegExp(/^[a-zA-Z0-9 ]+$/)
           return regEx.test(nameSchool) //returns either true or false
     }
 }



const nameSchoolValidators = [
   {
       validator: nameSchoolLengthChecker,
        message: 'text must be more than 5 character but less than 30'
   } ,
   {
    validator: nameSchoolStructureChecker,
     message: 'text must be alphanumeric'
} 
]


const Schema = mongoose.Schema;
const SchoolSchema = new Schema({
    
   nameSchool: { type: String, required: true, validator: nameSchoolValidators},
   owner: { type: String, required: true, validator: nameSchoolValidators},
   status: { type: String, required: true},
   yob: { type: Number, required: true},
   phone: { type: Number, required: true},
   email: {type: String, required: true, unique: true, lowercase: true, validate: emailValidators},
   website: { type: String},
   imageLink: { type: String},
   briefDesc: { type: String, required: true, validator: briefDescValidators},
   country: { type: String,  required: true},
   town: { type: String,  required: true},
   locations: [
       {
       coorX : { type: Number, required: true},
       coorY : { type: Number, required: true},

       }
   ],
   fields: [ // field e.g engineer
       {
       nameField: { type: String,  required: true}, // e.g Informatique et Systèmes d’Information
       diplomat: { type: String,  required: true},  //e.g Ingénieur
       branches : { type: Array,  required: true},  //e.g  ['managemant des système d information', 'génie logiciel']
       admission : { type: Array,  required: true},  //e.g ['first', 'third']
       admissionRequirements: { type: String },        //e.g Certified copy of Birth certificate and two passport size photos
       duration: { type: Number, required: true},    //e.g 5 years
       fees: [
           {
              year: { type: String, required: true}, //e.g first year

              price: { type: Number, required: true} //e.g 1,000,000 fcfa
          }
    ]


       }
   ]







    
});



module.exports = mongoose.model('School',SchoolSchema)






