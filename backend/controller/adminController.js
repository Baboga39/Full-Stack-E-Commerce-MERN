const service = require('../services')


const uploadProduct = async(req, res) => {
    try {
        const data = req.body;
        const product = await service.productService.uploadProduct(data);
        console.log('Upload product successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Upload product successfully',
            result: product,
        });
    } catch (error) {
        console.log(error.message)
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
}
const getProducts = async(req, res) => {
    try {
        const product = await service.productService.getAllProduct();
        console.log('Get product successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get product successfully',
            result: product,
        });
    } catch (error) {
        console.log(error.message)
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
}
const updateProduct = async(req, res) => {
    try {
        const data = req.body;
        const product = await service.productService.updateProduct(data);
        console.log('Update product successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Update product successfully',
            result: product,
        });
    } catch (error) {
        console.log(error.message)
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(500).json({
            success: false,
            statusCode: 500,
            message: 'Internal server error',
            result: error.message,
        });
    }
}

module.exports = {
    uploadProduct,
    getProducts,
    updateProduct
};