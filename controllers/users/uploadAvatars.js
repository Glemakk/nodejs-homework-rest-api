const path = require("path");
const fs = require("fs/promises");
const Jimp = require('jimp');

const {User} = require("../../models");
const { sendSuccessResponse } = require('../../helpers');

const avatarDir = path.join( __dirname, "../../", "public/avatars");

const uploadAvatars = async(req, res)=>{
    const {path: tempStorage, originalname} = req.file;
    try {        
        // const newUser = {
        //     name: req.body.name,
        //     avatar: "/public/avatars/default.png"
        // };
        // const result = await User.create(newUser);
        const [extention] = originalname.split(".").reverse();
        const newFileName = `user_main-image_${req.user._id}.${extention}`;
        const resultStorage = path.join(avatarDir, newFileName);
        //user_main-image_123123.png
        // const resultStorage = path.join(avatarDir, newFileName);
        // await fs.rename(tempStorage, resultStorage);
        const file = await Jimp.read(tempStorage)
        await file.resize(250, 250).write(tempStorage)
        await fs.rename(tempStorage, resultStorage);

    //    const avatarURL = `/avatars/${newName}`
        const avatar = path.join("/avatars", newFileName);
        const user = await User.findByIdAndUpdate(req.user._id, {avatarURL: avatar,}, {new: true});
       sendSuccessResponse(res, user)
    } catch (error) {
        await fs.unlink(tempStorage);
        throw error;
    }
};

module.exports = uploadAvatars;