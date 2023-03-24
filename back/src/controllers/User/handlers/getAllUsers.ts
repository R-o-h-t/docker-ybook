import { RequestHandler } from "express";
import {getAllUsersModel} from "../../../models/User";

const getAllUsers: RequestHandler = async (req, res, next) => {
    try{
        const allUsers = await getAllUsersModel();
        if (!allUsers) throw new Error("users not found")

        res.json(allUsers)
    }catch(err){
        next(err);
    }
}

export default getAllUsers;
