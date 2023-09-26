import { Request, Response } from "express";
import { UserModel, IUser } from "../models/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


const handleLogin = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }
    const foundUser = await UserModel.findOne({ username: username }).exec();
    if (!foundUser) {
        return res.status(401).json({ message: "Invalid username." });
    }
    // compare the password with hashed password
    const match = await bcrypt.compare(password, foundUser.password);
    if (match){
        // create jwt tokens
        console.log(process.env.ACCESS_TOKEN_SECRET)
        const accessToken = jwt.sign({ username: foundUser.username }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "1d" });
        // store refresh token in User DB
        await UserModel.updateOne({username: username}, {refreshToken}).exec();
        // send tokens
        // stored in browser memory for a day, sent with every request, not available to js
        res.cookie("jwt", refreshToken, { httpOnly: true , maxAge: 24*60*60*1000, secure: true, sameSite: "none"}); 
        // to store in frontend state
        return res.status(200).json({ message: "Login successful.", accessToken });
    } else {
        return res.status(401).json({ message: "Invalid password." });
    }
}

export default { handleLogin };