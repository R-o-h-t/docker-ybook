import { RequestHandler } from "express";
import { editCommentOnPostModel } from "../../../models/PostComment";

const editCommentOnPost: RequestHandler = async (req, res, next) => {
  try {
    const post = await editCommentOnPostModel(Number(req.params.id), req.body);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export default editCommentOnPost;
