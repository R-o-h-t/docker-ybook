import { RequestHandler } from "express";
import { getAllPostsModel } from "../../../models/Post";

const getAllPosts: RequestHandler = async (req, res, next) => {
    try {
        const posts = await getAllPostsModel();
        res.json(posts);
    } catch (err) {
        next(err);
    }
}

export default getAllPosts;
