import { RequestHandler } from "express";
import { getModelUser } from "../../../models/User";


const getUser: RequestHandler = async (req, res, next) => {
    try {

        const user = await getModelUser(parseInt(req.params.id));
        if (!user) throw new Error("user not found")
        res.json(user)
    } catch (err) {
        next(err);
    }
}

export default getUser;