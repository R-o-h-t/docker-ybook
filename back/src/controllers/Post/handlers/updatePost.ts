import { RequestHandler } from "express";
import { updatePostModel} from "../../../models/Post";

const updatePost: RequestHandler = async (req, res, next) => {
    try {
        const post = await updatePostModel(Number(req.params.id), req.body);
        res.json(post);
    } catch (err) {
        next(err);
    }
}

export default updatePost;