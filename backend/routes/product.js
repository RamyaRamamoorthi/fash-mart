const express = require("express");
const multer = require("multer");

const Product = require("../models/product");

const router =express.Router();

const storage = multer.diskStorage({
 destination : (req, file, cb) => {
 cb(null,"backend/images")
 },
 filename: (req, file , cb) => {
     const name = file.originalname.toLocaleLowerCase().split(' ').join('-');
     cb(null, name);
    }
});


router.post("/post",multer({storage : storage}).single("image"),(req,res)=>{
    const url = req.protocol + '://' + req.get("host"); // to acquire the file path to create  file  URL
   
    const prod = new Product({
        productName:req.body.productName,
        productPrice : req.body.productPrice,
        productBrand : req.body.productBrand,
        productBarcode : req.body.productBarcode,
        productDesc : req.body.productDesc,
        image :  url+ "/images/"   +  req.file.filename
    });
    prod.save().then(addedProduct => {
      res.status(200).json({ 
        product:{
        // all the properties will be  a copy
        id : addedProduct._id,// to update the post we did here and push into array
         productName : addedProduct.productName,
         productPrice : addedProduct.productPrice,
         productBrand : addedProduct.productBrand,
         productBarcode : addedProduct.productBarcode,
         image : addedProduct.image
      }
     
    });
    //console.log(addedProduct.image);
    });
    
});
router.get("/get",(req,res)=>{
  Product.find().then(documents => {
   console.log(documents);
    res.status(200).json({prd : documents});
  })
})


// this route to get the details even after refreshing the edit page

router.get("/get/:id",(req,res)=>{
  Product.findById(req.params.id).then(product => {
    if(product){
      res.status(200).json(product)// find the product and returns

    }
    else
    {
      res.status(404).json({ message: "Product not found!" });
    }
  })
})



router.put("/put/:id",(req,res)=>{
  const updprd = new Product({
    _id:req.body.id, // using exisiting id
    productName : req.body.productName,
   productPrice : req.body. productPrice,
    productBrand : req.body.productBrand,
    productBarcode :  req.body.productBarcode,
   productDesc : req.body.productDesc
  });
  Product.updateOne({_id : req.params.id},updprd).then(result => {
   
    res.status(200).json({message : "success"})
  })
});

  





router.delete("/delete/:id",(req,res)=>{
  Product.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});




module.exports = router;