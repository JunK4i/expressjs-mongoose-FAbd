import { Request, Response } from "express";
import { UserModel, IUser } from "../models/users";




const getUserProfile = async (req: Request, res: Response) => {
    try{
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ message: "Username and access token are required." });
        }
        const foundUser = await UserModel.findOne({ username: username }).exec();
        const userProfile = {
            username: foundUser?.username,
            email: foundUser?.settings.email,
            isNotificationON: foundUser?.settings.isNotificationOn,
    
        }
        return res.status(200).json({success: true, userProfile});    
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: "Internal server error."});
    }
   
}

const updateUserProfileSettings = async (req: Request, res: Response) => {
    try{
    const { username, email, isNotificationOn } = req.body;
        if (!username || !email || !isNotificationOn) {
            return res.status(400).json({ message: "Username and settings are required." });
        }
        const foundUser = await UserModel.findOne({ username: username }).exec();
        if (!foundUser) {
            return res.status(401).json({ message: "Invalid username." });
        }
        UserModel.updateOne({username: username}, {settings: {email, isNotificationOn}}).exec();
        
        if(email) foundUser.settings.email = email;
        if(isNotificationOn) foundUser.settings.isNotificationOn = isNotificationOn;
        await foundUser.save();
        return res.status(200).json({success: true, message: "User settings updated."});
    } catch (err) {
        console.log(err);
        return res.status(500).json({success: false, message: "Internal server error."});
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try{
        const { username } = req.body;
        if(!username){
            return res.status(400).json({ message: "Username is required." });
        }
        const foundUser = await UserModel.findOne({ username: username }).exec();
        if (!foundUser) {
            return res.status(401).json({ message: "Invalid username." });
        }
        await UserModel.deleteOne({username: username}).exec();
        return res.status(200).json({success: true, message: "User deleted."});
    } catch(err){
        console.log(err);
        return res.status(500).json({success: false, message: "Internal server error."});
    }
}


export default { deleteUser, getUserProfile, updateUserProfileSettings };