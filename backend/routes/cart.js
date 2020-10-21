const express = require("express");
const Cart = require("../models/cart");

const router = express.Router();

router.post("/add",(req,res) => {
    const cart = new Cart({
       
        productName:req.body.productName,
        productPrice : req.body.productPrice,
        productBrand : req.body.productBrand,
        productBarcode : req.body.productBarcode,
        productDesc : req.body.productDesc,
        image : req.body.image
    });
    cart.save().then(addeditem => {res.json({
        items : addeditem })
 })
});
router.get("/get",(req,res)=>{
    Cart.find().then(documents => {
     console.log(documents);
      res.status(200).json(documents);
    })
  });

  
router.delete("/delete/:id",(req,res)=>{
  Cart.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});


module.exports = router;