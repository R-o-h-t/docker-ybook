import { RequestHandler } from "express";
import { addFriendshipRequestModel } from "../../../models/Friendship";

const addFriendshipRequest: RequestHandler = async (req, res, next) => {
  try {
    const friendship = await addFriendshipRequestModel(req.body);
    res.json(friendship);
  } catch (err) {
    next(err);
  }
};

export default addFriendshipRequest;
