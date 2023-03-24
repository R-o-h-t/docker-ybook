import express  from "express";
import Message  from '../controllers/Message'
const MessageRouter = express.Router({mergeParams: true});

MessageRouter.post('/',Message.createMessageRequest)


export default MessageRouter