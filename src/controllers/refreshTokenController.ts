import { Request, Response } from "express";
import { UserModel, IUser } from "../models/users";
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req: Request, res: Response) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(400).json({ message: "Access token is required." });
    console.log("cookies.jwt", cookies.jwt);
    const refreshToken = cookies.jwt;

    const foundUser = await UserModel.findOne({ refreshToken: refreshToken }).exec();
    if (!foundUser) {
        return res.status(401).json({ message: "Invalid refresh token." });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
        if (err) {
            return res.status(403).json({ message: err.message });
        }
        if (decoded.username !== foundUser.username) {
            return res.status(403).json({ message: "Invalid refresh token." });
        }
        const accessToken = jwt.sign({ username: foundUser.username }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
        const newRefreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "1d" });
        return res.status(200).json({ message: "Refresh successful.", accessToken});
    })
   
}   

export default{ handleRefreshToken };