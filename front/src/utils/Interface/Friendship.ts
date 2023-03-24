import { IUser } from './User';
import { IConversationMessage } from './Conversation';

enum FriendshipStatus {
    PENDING,
    ACCEPTED,
    IGNORED
}

export interface IFriendship {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    from: IUser;
    to: IUser;
    status: FriendshipStatus;
    fromId: number;
    toId: number;
    notification: Notification[];
}

interface Notification {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    read: boolean;
    friendship: IFriendship;
    friendshipId: number;
    message: IConversationMessage;
    conversationMessageId: number;
}