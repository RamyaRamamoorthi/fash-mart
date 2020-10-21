const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: { type : String , required:true},
    productPrice : {type : String, required : true},
    productBrand : {type : String, required : true},
    productBarcode : {type : String, required : true},
    productDesc : {type : String},
    image : {type: String}
})
module.exports = mongoose.model('Product',productSchema);