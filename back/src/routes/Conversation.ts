import express  from "express";
import Conversation  from '../controllers/Conversation'
const ConversationRouter = express.Router({mergeParams: true});

ConversationRouter.get('/',Conversation.getAllConversationRequest)
ConversationRouter.get('/:conversationId',Conversation.getConversationRequest)
ConversationRouter.post('/',Conversation.createConversationRequest)


export default ConversationRouter