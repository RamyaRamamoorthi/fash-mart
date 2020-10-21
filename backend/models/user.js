// const mongoose = require('mongoose');

// //will not connect automatically need to import using require('mongoose-unique-validator')
// //use "uniqueValidator" as plugin to validate data and this checks before adding it into the
// // database of the unique names

// const uniqueValidator = require("mongoose-unique-validator");

// const userSchema = mongoose.Schema({
//     //unique is not a validator like unique-validato or required and  will just hav some internal optimazton
//   email : {type : String, required: true, unique: true  } ,
//   password :{type : String, required: true}
// });

// userSchema.plugin(uniqueValidator);
// //calls the plugin this feature is provided by the mongoose 
// // and this will throw an error if we try to store a user data which matches the existing one


// module.exports = mongoose.model('User',userSchema);