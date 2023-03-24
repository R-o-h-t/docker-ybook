import { removeBlockedUser } from "../../../models/User";
import { RequestHandler } from "express";

const removeBlocked: RequestHandler = async (req, res, next) => {
  try {
    const user = await removeBlockedUser(Number(req.params.id), req.body.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export default removeBlocked;