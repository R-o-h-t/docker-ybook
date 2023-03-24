import { RequestHandler } from "express";
import { unlikePostModel } from "../../../models/PostLike";

const unlikePost: RequestHandler = async (req, res, next) => {
    try {
        const post = await unlikePostModel(Number(req.params.id));
        res.json(post);
    } catch (err) {
        next(err);
    }
}

export default unlikePost;