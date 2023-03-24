import { RequestHandler } from "express";
import { getFriendshipRequestsModel } from "../../../models/Friendship";

const getFriendshipRequests: RequestHandler = async (req, res, next) => {
  try {
    const friendship = await getFriendshipRequestsModel(
      Number(req.params.userId)
    );
    res.json(friendship);
  } catch (err) {
    next(err);
  }
};

export default getFriendshipRequests;
