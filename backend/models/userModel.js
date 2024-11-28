const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String, 
        unique: true,
        require: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8, 
        validate: {
            validator: function (value) {
                return /[A-Z]/.test(value) && /[\W_]/.test(value);
            },
            message: 'Password must contain at least one uppercase letter and one special character',
        },
    },
    role:{
        type: [String],
        enum: ['USER', 'ADMIN'], 
        default: ['USER']
    },
    profilePic: String,
}, {
    timestamps: true
})
userSchema.pre('save', async function (next) {
    const user = this;
  
    if (user.isModified('password')) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }
    next();
  });
module.exports = mongoose.model('User', userSchema);
