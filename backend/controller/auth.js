// module.exports = (req,res,next)=>{

// try{
//  const token = req.headers.authorization.split(" ")[1]; // set the bearrer and token
//  jwt.verify(token, "secret_this_should_be_longer"); //verify the token
//  next();
// }
// catch (error){
//     res.status(401).json({message: "Auth failed"})
// }
// }