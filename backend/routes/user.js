// const express = require("express");
// const bcrypt = require("bcrypt");
// const User = require('../models/user');
// const jwt =  require("jsonwebtoken");
// const router =express.Router();

// router.post("/register",(req,res)=>{
//   //bcrypt.tohash the value calling hash method(gets the password, hash it with higher numbers so it will be safe(10)). then() or callbacks can be used  
//     bcrypt.hash(req.body.password,10)
//     .then(hash => {
//         const user = new User({
//             email : req.body.email,
//             password : hash
//         });
//         //save the user details got from above then block
//         user.save()
//         .then(result => {
//             res.status(201).json({
//                 res : result
//             });
//           })
//           // after saving the result catch error if user stored already
//           .catch(err => {
//               res.status(500).json({
//                   error: err
//               });
//           });
//         });
//     });

// // To check the user is valid or not
// router.post("/login",(req,res) => {
//     let fetchedUser;
//   //   1.  find if  email exists 
// // get the email from the db and "FIndOne" to extract one user
// User.findOne({email : req.body.email})
// .then(user => { // user will = email fetched
//     // if   did not found  email
//     if(!user) {
//         return res.status(401).json({ message : "Auth failed"});
//     } 
//     fetchedUser = user;
//     // if found compare with password
// // password is hashed si use bcrypt to compare
// return bcrypt.compare(req.body.password , user.password) // user.password == hashed password
// // compared and return to nxt then
// }) .then(result => {
    
//     if(!result){ // comparision fails
//         return res.status(401).json({ message : "Auth failed"});
//     }
//  // valid the jwt token generate  [sign == creates new token] enter secert to make uncrackable
//  const token = jwt.sign({email : fetchedUser.email , userId : fetchedUser._id}, 
//     'secret_this_should_be_longer' );
   
//     res.status(200).json({token : token});
   
// }).catch(err => { // for other errors
//     console.log(err);
//     return res.status(401).json({ message : "Auth failed"});
// })
// })








// module.exports = router;