import { RequestHandler, Request, Response } from "express"
import { addConversationModel } from "../../../models/Conversation"

const createConversationRequest = async (req: Request, res: Response) => {
    try{
        const data = req.body;
        const conversation = await addConversationModel(data);
        res.json(conversation)
    }catch(err){
        return res.status(500).json({message: "Internal server error"})
    }
}

export default createConversationRequest