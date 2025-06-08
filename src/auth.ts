import { NextFunction,Request,Response } from "express";
import jwt, { decode } from 'jsonwebtoken'
import { JWT_SECRET } from "./config";


export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("HEADERS", req.headers);

  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "No token or invalid format" });
    return;
  }

  const token = authHeader.split(" ")[1]; 
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    //@ts-ignore
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
    return 
  }
};
