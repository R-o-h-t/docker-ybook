import { addBlockedUser } from "../../../models/User";
import { RequestHandler } from "express";

const addBlocked: RequestHandler = async (req, res, next) => {
  try {
    const user = await addBlockedUser(Number(req.params.id), req.body.userId);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export default addBlocked;
