import { Request, Response } from "express";
import { UserModel, IUser } from "../models/users";
import bcrypt from "bcrypt";

const handleNewUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required." });
    }
    const duplicate = await UserModel.find({ username: username }).exec();
    // check for duplicate usernames in the db
    if (duplicate.length > 0) {
        return res.status(409).json({ message: "Username already exists." });
    }
    try{
        // encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);
        // store the username in the db
        const newUser = await UserModel.create({ username: username, password: hashedPwd });
        console.log("newUser success ", newUser)
        return res.status(201).json({'sucess': newUser}) ;
    } catch(err: any){
        console.log("handleNewUser Error", err);
        return res.status(500).json({ error: err.message });
    }
};

export default{ handleNewUser };