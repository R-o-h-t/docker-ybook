import { RequestHandler } from "express";
import { createPostModel } from "../../../models/Post";

const createPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await createPostModel(req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export default createPost;
