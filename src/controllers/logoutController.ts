import { Request, Response } from "express";
import { UserModel, IUser } from "../models/users";

const handleLogout = async (req: Request, res: Response) => {
    // on client, also delete the accessToken

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204); // no content
    const refreshToken = cookies.jwt;

    // is refreshToken in DB
    const foundUser = await UserModel.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie("jwt", { httpOnly: true , secure: true, sameSite: "none"});
        return res.sendStatus(204); // no content
    }
    
    // delete refreshToken from DB
    await UserModel.updateOne({username: foundUser.username}, {refreshToken: ""}).exec();
    res.clearCookie("jwt", { httpOnly: true, secure: true , sameSite: "none"});
    return res.sendStatus(204); // no content 
}   

export default{ handleLogout };