import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dob:{
        type: Date,
        required: false,
    },
    phone: {
        type: String,
        required: false,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    title: {
        type: String,
    },
    address: {
        type: String,
    },
    maritalStatus: {
        type: String,
    },
    countryOfOrigin: {
        type: String,
    },
    stateOfOrigin: {
        type: String,
    },
    industry: {
        type: String,
    },
    occupation: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    otp: {
        type: String,
        default: null,
    },
    otpExpires: {
        type: Date,
        default: null,
    },
    status: {
        type: Boolean,
        default: false,
    },
    paymentSlip: { 
        type: String 
    }, // Path to uploaded payment slip
    ad: {
        imageUrl: String,
        linkUrl: String,
        altText: String,
    },// Path to ad details
}, {
    timestamps: true,
});


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;