const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    productName: { type : String },
    productPrice : {type : String},
    productBrand : {type : String},
    productBarcode : {type : String},
    productDesc : {type : String},
    image : {type: String}
})
module.exports = mongoose.model('Cart', cartSchema);