import  express, { NextFunction }  from "express";
import { Request, Response } from "express";
import AuthMiddleware from "../middlewares/lame-auth";

const HelloRoute = express.Router();
HelloRoute.use(AuthMiddleware)
HelloRoute.get('/world', (req: Request,res: Response,next: NextFunction)=>{
    res.json({message: "Hello World!"});
})

HelloRoute.get('/world/:name', (req: Request,res: Response,next: NextFunction)=>{
    res.json({message: `Hello ${req.params.name}!`});
})

export default HelloRoute;
