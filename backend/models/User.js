const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, 'Please enter your First Name'], 
        maxlength: [30, 'Your First Name cannot exceed 30 characters'],
        trim: true
    },
    lastName: { 
        type: String, 
        required: [true, 'Please enter your Last Name'], 
        maxlength: [30, 'Your Last Name cannot exceed 30 characters'],
        trim: true
    },
    email: { 
        type: String, 
        required: [true, 'Please enter your Email Address'],  
        unique: true,
        validate: [validator.isEmail, 'Please enter a Valid Email Address']
    },
    password: { 
        type: String, 
        required: [true, 'Please enter your password'], 
        minlength: [8, 'Your password must be longer than 8 characters'],
        select: false
    },
    role: { 
        type: String, 
        default: 'user',
        enum: ['user', 'admin'] 
    },
    createdAt: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
});

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;