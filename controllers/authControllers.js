const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    const errors = { email: '', password: '' };

    // incorrect email
    if (err.message === 'incorect email address try again') {
        errors.email = 'That email is incorrect try again';
    }

    // incorrect password
    if (err.message === "incorrect password try again") {
        errors.password = "The password you provide is wrong try again";
    }

    // pass length
    if (err.message === "Minimum length for password is 6") {
        errors.password = "The password length required is more than 8 digits";
    }

    // error code
    if (err.code === 11000) {
        errors.email = 'That email is already taken';
        return errors;
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
};

// Create token
const maxAge = 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'cyberx secret pin', { expiresIn: maxAge });
};

module.exports.home_get = (req, res) => {
    res.render('home');
};
module.exports.services_get = (req, res) => {
    res.render('services');
};
module.exports.news_get = (req, res) => {
    res.render('news');
};
module.exports.about_get = (req, res) => {
    res.render('about');
};
module.exports.appoint_get = (req, res) => {
    res.render('appoint');
};
module.exports.clinic_get = (req, res) => {
    res.render('clinic');
};
module.exports.nurses_get = (req, res) => {
    res.render('nurses');
};
module.exports.docs_get = (req, res) => {
    res.render('docs');
};
module.exports.signup_get = (req, res) => {
    res.render('signup');
};

module.exports.login_get = (req, res) => {
    res.render('login');
};

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newUser = await User.create({ email, password });
        const token = createToken(newUser._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true });
        res.status(200).json({ user: newUser._id });
    } catch (err) {
        const errs = handleErrors(err);
        res.status(400).json({ errs });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errs = handleErrors(err);
        res.status(400).json({ errs });
    }
};
