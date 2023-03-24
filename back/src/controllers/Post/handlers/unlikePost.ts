import {RequestHandler} from 'express';
import {unlikePostModel} from '../../../models/Post';

export const unlikePost: RequestHandler = async (req, res) => {
    const {postId} = req.params;
    const userId = req.body.userId;

    const post = await unlikePostModel(parseInt(postId), userId);

    return res.json(post);
}

export default unlikePost;