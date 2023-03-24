import { RequestHandler } from "express";
import { getFriendshipModel } from "../../../models/Friendship";

const getFriendship: RequestHandler = async (req, res, next) => {
  try {
    const friendship = await getFriendshipModel(Number(req.params.id));
    res.json(friendship);
  } catch (err) {
    next(err);
  }
};

export default getFriendship;
