const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage:[],
    price:Number,
    selling:Number,
    description:String,
}, {
    timestamps: true
}
)

module.exports = mongoose.model('Product', productSchema);