import { RequestHandler } from "express";
import { getPostLikesModel } from "../../../models/PostLike";

export const getPostLikes: RequestHandler = async (req, res, next) => {
    try {
        const posts = await getPostLikesModel(Number(req.params.id));
        res.json(posts);
    } catch (err) {
        next(err);
    }
}