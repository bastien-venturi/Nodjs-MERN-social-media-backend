// import UserModel from '../models/user.Model';
const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const { signUpErrors } = require('../utils/errors.utils');

const maxAge = 3 * 24 * 60 * 60 * 1000;
// const maxAge = "30d"; (autre façon de faire la durée de validité du token)
const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge,
    })
};



module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const { pseudo, email, password } = req.body;

    try {
        const user = await UserModel.create({ pseudo, email, password });
        res.status(201).json({ user: user._id });
    } 
    catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors });
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        res.status(400).send({ err: err.message });
    }
}

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}