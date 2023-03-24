import { RequestHandler } from "express";
import { acceptFriendshipRequestModel } from "../../../models/Friendship";

const acceptFriendshipRequest: RequestHandler = async (req, res, next) => {
  try {
    const friendship = await acceptFriendshipRequestModel(req.body.userIdw);
    res.json(friendship);
  } catch (err) {
    next(err);
  }
};

export default acceptFriendshipRequest;
