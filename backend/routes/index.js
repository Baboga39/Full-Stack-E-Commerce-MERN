const express = require('express')
const authRoute = require('./authRoute')
const adminRoute = require('./adminRoute')  

module.exports = (app)=>{


    /*Auth */ 
    app.use('/api/v1/auth', authRoute);


    /*Admin */ 

    app.use('/api/v1/admin', adminRoute);


}