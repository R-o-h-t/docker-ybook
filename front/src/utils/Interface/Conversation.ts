import { IUser } from "./User";

export interface IConversation {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    from: IUser;
    fromId: number;
    to: IUser;
    toId: number;
    messages: IConversationMessage[];
  }
  
export interface IConversationMessage {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    conversation: IConversation;
    conversationId: number;
    content: string;
    from: IUser;
    fromId: number;
    userId: number;
    to: IUser;
    toId: number;
    text: string;
}