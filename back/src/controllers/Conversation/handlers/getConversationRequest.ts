import { Request, Response, NextFunction } from "express";
import { getConversationModel } from "../../../models/Conversation";

const getConversationRequest = async (req: Request, res: Response, next: NextFunction) => {
    try{
       if(req.body){
           const userId = +req.params.id;
           const conversationId = +req.params.conversationId;
           if(!userId || !conversationId){
               return res.status(400).json({message: "userId or conversationId not here"})
           }
           try{
               const conversation = await getConversationModel(conversationId);
               return res.json(conversation)
           }catch(e){
               console.log(e);
               
               return res.status(400).json('conversation fail');
           }
        }else{
            return res.status(500).json({message: "Internal server error"});
        }
    }catch(err){
        return res.status(500).json({message: "Internal server error"})
    }
}

export default getConversationRequest;