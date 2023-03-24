import { RequestHandler } from "express";
import { createUserModel } from "../../../models/User";

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await createUserModel(req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export default createUser;
