import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";



const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No authorization header sent." });
    }
    console.log("authHeader", authHeader); // Bearer token
    const token = authHeader?.split(" ")[1];
    jwt.verify(token!, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token." });
        }
       if(!decoded) {
              return res.status(403).json({ message: "Invalid token." });
       }
        res.locals.username = (decoded as any).username;
        next();
    });
}
export default verifyJWT;