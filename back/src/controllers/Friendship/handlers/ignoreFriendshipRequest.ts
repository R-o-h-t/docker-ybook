import { RequestHandler } from "express";
import { ignoreFriendshipRequestModel } from "../../../models/Friendship";

const ignoreFriendshipRequest: RequestHandler = async (req, res, next) => {
  try {
    const friendship = await ignoreFriendshipRequestModel(req.body);
    res.json(friendship);
  } catch (err) {
    next(err);
  }
};

export default ignoreFriendshipRequest;
