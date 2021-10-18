const { NotFound } = require("http-errors");
const {sendSuccessResponse} = require('../../helpers')

const { User } = require("../../models");

const verify = async (req, res) => {
    // console.log(req.params)
    const { verificationToken } = req.params;
    const user = await User.findOne({ verifyToken: verificationToken });
    if (!user) {
        throw new NotFound("User not found");
    }
    await User.findByIdAndUpdate(user._id, { verifyToken: null, verify: true });
    // sendSuccessResponse(res, { result });
      res.status(200).json({
      message: 'Verification successful',
    })
};

module.exports = verify;