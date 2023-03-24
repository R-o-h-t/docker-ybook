import { Conversation, User } from "@prisma/client"
import { Request, Response } from "express";
import { getAllConversationModel } from "../../../models/Conversation";

const getAllConversationRequest = async (req: Request,res: Response)=>{
    try{
        if(req.body){
            const userId = +req.params.id;
            
            if(!userId){
                return res.status(400).json({message: "userId not here"})
            }
            try{
                const conversations = await getAllConversationModel(userId);

                return res.json(conversations)
            }catch(e){
                console.log(e);
                
                return res.status(400).json('conversations fail');
            }
            
            
        }else{
            return res.status(400).json({message: "Bad request"})
        }

    }catch(err){
        return res.status(500).json({message: "Internal server error"})
    }
}

export default getAllConversationRequest;