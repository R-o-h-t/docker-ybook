import { RequestHandler } from "express";
import { likePostModel } from "../../../models/PostLike";

const likePost: RequestHandler = async (req, res, next) => {
    try {
        const post = await likePostModel(req.body);
        res.json(post);
    } catch (err) {
        next(err);
    }
}

export default likePost;