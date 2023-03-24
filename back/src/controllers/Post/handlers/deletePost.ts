import { RequestHandler } from "express";
import { deletePostModel } from "../../../models/Post";

const deletePost: RequestHandler = async (req, res, next) => {
    try {
        const post = await deletePostModel(Number(req.params.id));
        res.json(post);
    } catch (err) {
        next(err);
    }
}

export default deletePost;