import { RequestHandler } from "express";
import { getPostModel } from "../../../models/Post";

const getPost: RequestHandler = async (req, res, next) => {
    try {
        const post = await getPostModel(Number(req.params.id));
        res.json(post);
    } catch (err) {
        next(err);
    }
}

export default getPost;
