import { RequestHandler } from "express";
import { getLikedPostsModel } from "../../../models/PostLike";

const getLikedPosts: RequestHandler = async (req, res, next) => {
    try {
        const posts = await getLikedPostsModel(Number(req.params.id));
        res.json(posts);
    } catch (err) {
        next(err);
    }
}

export default getLikedPosts;