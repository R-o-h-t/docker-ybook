import { RequestHandler } from 'express';
import { togglePostLikeModel } from '../../../models/Post';

export const togglePostLike: RequestHandler = async (req, res) => {
    const { postId } = req.params;
    const userId = req.body.userId;

    const post = await togglePostLikeModel(parseInt(postId), userId);

    return res.json(post);
}

export default togglePostLike;
