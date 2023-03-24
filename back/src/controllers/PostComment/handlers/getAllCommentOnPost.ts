import { RequestHandler } from "express";
import { getAllCommentOnPostModel } from "../../../models/PostComment";

const getAllCommentOnPost: RequestHandler = async (req, res, next) => {
    try {
        const posts = await getAllCommentOnPostModel(Number(req.params.id));
        res.json(posts);
    } catch (err) {
        next(err);
    }
}

export default getAllCommentOnPost;