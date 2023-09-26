import { Request, Response, NextFunction } from "express";
import whitelist from "../configs/whitelist";
const credentials = (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin!;
    if (whitelist.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    next();
}

export default credentials;

