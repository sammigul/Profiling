require('dotenv').config({ path: './src/config/.env' });



var AuthController = require('../Auth/AuthController');

const { comparePassword, hashPassword } = require('../../helpers/hashing');

var Users = require('../../models/User');


var tokens = require('../../helpers/refreshToken');

exports.profile = async (req, res, next) => {
    try {
        console.log(req.user);
        const isUserExists = await Users.findById(req.user.id).select("-password");

        if (!isUserExists) return res.status(400).json({ message: "User account not found." });

        res.status(200).json(isUserExists);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "500: Error occured" });
    }
}

exports.updatePersonalInformation = (req, res, next) => {
    try {
        const { name, email } = req.body;

        Users.updateOne(
            { _id: req.user.id },
            { $set: { name: name, email: email } }
        ).then((updateResponse) => {

            Users.find({ email: email }).then((response) => {

                // Generate new access token for user
                const user = {
                    id: response[0]._id.toString(),
                }

                const token = AuthController.generateAccessToken(user);
                const refreshToken = AuthController.generateRefreshToken(user);

                tokens.addRefreshTokens(refreshToken);

                res.status(200).json({
                    user: response[0],
                    accessToken: token,
                    refreshToken: refreshToken,
                    message: "User Details are Updated Successfully."
                });

            }).catch((error) => {
                if (error) res.status(404).json({ message: "error occured." });
            });

        }).catch((error) => {
            if (error) res.status(404).json({ message: "user not found" });
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "500: Error occured" });
    }
}




exports.changePassword = async (req, res, next) => {
    try {

        const { currentPassword, newPassword, confirmPassword } = req.body;

        console.log(req.user);

        const UserDoc = await Users.findById(req.user.id);

        if (!UserDoc) return res.status(400).json({ message: "Invalid user id." });

        const comparedPassword = comparePassword(currentPassword, UserDoc.password);

        if (!comparedPassword) return res.status(400).json({ message: "Current password is incorrect." });

        if (newPassword !== confirmPassword) return res.status(400).json({ message: "The password and confirm password fields do not match." });

        const newHashedPassword = hashPassword(newPassword);

        Users.findByIdAndUpdate(req.user.id, { password: newHashedPassword }, { new: true }).then((response) => {

            return res.status(204).json({ message: "User password is updated successfully." });
        }).catch((err) => {
            console.log(err);
            return res.status(403).json({ message: "User don't have sufficient permissions to change password." });
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "500: Error occured while changing user password." });
    }
}

