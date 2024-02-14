const mongoose = require('mongoose');
const { isEmail } = require('validator');


const userSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        minLength: 3
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model('user', userSchema);