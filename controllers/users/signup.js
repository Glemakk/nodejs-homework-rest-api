const { Conflict } = require('http-errors');
// const bcrypt = require("bcryptjs")
const { User } = require('../../models');
const gravatar = require('gravatar');
const { v4 } = require('uuid');

const {sendEmail} = require('../../helpers')

const signup = async (req, res) => {
    const { email, password } = req.body;
    console.log("email >>", email)
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

    const avatar = gravatar.url(email, { s: '250', d: 'robohash' }, true);
    const verifyToken = v4();
    const newUser = new User({ email, verifyToken, avatar });
    //после объявления переменной - newUser это объект у кот-го есть св-во email
    // newUser = {email}
    newUser.setPassword(password);
    // newUser.setAvatar(avatar);
    //после объявления newUser.setPassword(password) - newUser это объект у кот-го есть св-во email и password
    // newUser = {email}
    await newUser.save(); //метод save - сохранили в базу

    //создаем само письмо
    const emailMsg = {
        to: email,
        subject: "Confirm new user sign-ups",
        html: `
        <a href="http://localhost:3000/users/verify/${verifyToken}" target="_blank">Confirm your email</a>`
    }

    await sendEmail(emailMsg);
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
        //иногда отправляют еще verifyToken
        //data: { verifyToken }
    })

};

module.exports = signup;