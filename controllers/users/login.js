const {NotFound, BadRequest} = require('http-errors')
// const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // универсально и для большей безопасности
    if (!user || !user.comparePassword(password)) {
        throw new BadRequest('Invalid email or password');
    }

    // if (!user) {
    //     throw new NotFound(`Email ${email} not found`);
    //     // res.status(404).json({
    //     //     status: "error",
    //     //     code: 404,
    //     //     message: "Not found"
    //     // });
    //     // return;
    // }

    // if (!user.comparePassword(password)) {
    //     throw new BadRequest('Invalid password');
    // }// или так как ниже
    // // if (!bcrypt.compareSync(password, user.password)) {
    // //     throw new BadRequest('Invalid password')
    // // }
    const { _id } = user;
    const payload = {
        // _id: user._id
        _id
    }
    const token = jwt.sign(payload, SECRET_KEY);
    // const token = user.createToken();
    await User.findByIdAndUpdate(_id, { token });
    res.json({
        status: "success",
        code: 200,
        data: {
            token
        }
    })
};

module.exports = login;