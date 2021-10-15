const path = require("path");
const fs = require("fs/promises");

const {User} = require("../../models");

const uploadDir = path.join( __dirname, "../../", "public/avatars");

const uploadAvatars = async(req, res)=>{
    const {path: tempStorage, originalname} = req.file;
    try {        
        const newUser = {
            name: req.body.name,
            avatar: "/public/avatars/default.png"
        };
        const result = await User.create(newUser);
        const [extention] = originalname.split(".").reverse();
        const newFileName = `user_main-image_${result._id}.${extention}`;
        //user_main-image_123123.png
        const resultStorage = path.join(uploadDir, newFileName);
        await fs.rename(tempStorage, resultStorage);
        const avatar = path.join("/avatars", newFileName);
        const user = await User.findByIdAndUpdate(result._id, {avatarURL: avatar,}, {new: true});
        res.status(201).json({
            result: user
        });
    } catch (error) {
        await fs.unlink(tempStorage);
        throw error;
    }
};

module.exports = uploadAvatars;