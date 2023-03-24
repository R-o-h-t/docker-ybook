import { RequestHandler } from "express";
import { deleteFriendshipModel } from "../../../models/Friendship";

const deleteFriendship: RequestHandler = async (req, res, next) => {
  try {
    const friendship = await deleteFriendshipModel(parseInt(req.params.id));
    res.json(friendship);
  } catch (err) {
    next(err);
  }
};

export default deleteFriendship;
