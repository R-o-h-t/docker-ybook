import { Request, Response } from "express";
import { createMessageModel } from "../../../models/Message";
import {ioServer}  from "../../../index";

const createMessageRequest = async (req: Request, res: Response) => {
    try{
        const data = req.body;
        if(!data.content || !data.userId || !data.conversationId){
            return res.status(400).json({message: "Bad request"})
        }
        try{
            console.log(data);
            const message = await createMessageModel(data);
            ioServer.to(`room-${data.conversationId}`).emit('sendMessage',message);
            return res.json(message)
        }catch(e){
            console.log(e);
            
            return res.status(400).json('message fail');
        }
     
    }catch(err){
        return res.status(500).json({message: "Internal server error"})
    }
}

export default createMessageRequest;