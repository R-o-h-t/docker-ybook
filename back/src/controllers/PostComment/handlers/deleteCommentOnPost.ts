import { RequestHandler } from "express";
import { deleteCommentOnPostModel } from "../../../models/PostComment";

const deleteCommentOnPost: RequestHandler = async (req, res, next) => {
    try {
        const post = await deleteCommentOnPostModel(Number(req.params.id));
        res.json(post);
    } catch (err) {
        next(err);
    }
}

export default deleteCommentOnPost;