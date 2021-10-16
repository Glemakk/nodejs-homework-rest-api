const { Conflict } = require('http-errors');
// const bcrypt = require("bcryptjs")
const { User } = require('../../models');
const gravatar = require('gravatar');

const signup = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // 409 - already exist
    if (user) {
        throw new Conflict('Email in use');
        // res.status(409).json({
        //     status: "error",
        //     code: 409,
        //     message: "Email in use"
        // });
        // return;
    }

    var avatar = gravatar.url(email, {s: '250', d: 'robohash'}, true);
    const newUser = new User({ email });
    //после объявления переменной - newUser это объект у кот-го есть св-во email
    // newUser = {email}
    newUser.setPassword(password);
    newUser.setAvatar(avatar);
    //после объявления newUser.setPassword(password) - newUser это объект у кот-го есть св-во email и password
    // newUser = {email}
    await newUser.save(); //метод save - сохранили в базу

    // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    // const newUser = {email, password: hashPassword}
    // await User.create(newUser);
    res.status(201).json({
        user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
        // status: "success",
        // code: 201,
        // message: "Success signup"
    })
};

module.exports = signup;