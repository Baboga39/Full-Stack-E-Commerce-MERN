const service = require('../services')


const allUser = async(req,res) =>{
    try {
        const listUsers = await service.userService.getAllUsers();
        console.log('Get all users successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Get all users successfully',
            result: listUsers,
        })
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


const updateUser = async(req, res) => {
    try {
        const { userId,name,email, role } = req.body;
        const payload = {
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role})
        }
        const updatedUser = await service.userService.updateUser(userId,payload);
        console.log('Update user role successfully')
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Update user role successfully',
            result: updatedUser,
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

module.exports = {allUser,
    updateUser,
    uploadProduct
};