import { RequestHandler } from "express";
import { getFriendsModel } from "../../../models/Friendship";

const getFriends: RequestHandler = async (req, res, next) => {
    try {
        const friends = await getFriendsModel(Number(req.params.userId));
        res.json(friends);
    } catch (err) {
        next(err);
    }
}

export default getFriends;