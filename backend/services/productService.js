const productModel = require('../models/productModel')

const uploadProduct = async (data) =>{
  const product = new productModel(data);
  return await product.save();
}

const getAllProduct = async () =>{
  const products = await productModel.find({});
  return products;
}
const updateProduct = async (data) =>{
  const product = await productModel.findByIdAndUpdate(data._id, data, {new: true});
  return product;
}

module.exports = {
    uploadProduct,
    getAllProduct,
    updateProduct
}