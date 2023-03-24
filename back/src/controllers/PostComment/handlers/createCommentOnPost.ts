import { RequestHandler } from "express";

import { createCommentOnPostModel } from "../../../models/PostComment";

const createCommentOnPost: RequestHandler = async (req, res, next) => {
    try {
        const post = await createCommentOnPostModel(req.body);
        res.json(post);
    } catch (err) {
        next(err);
    }
}

export default createCommentOnPost;
