import { PrismaClient, Conversation, Prisma, User  } from "@prisma/client";

const prisma = new PrismaClient()

export const addConversationModel = async(data: Prisma.ConversationCreateInput) => {
    return prisma.conversation.create({
        data
    })
}

export const deleteConversationModel = async(idConversation: number) => {
    return prisma.conversation.delete({
        where: {
            id:idConversation
        }
    })
}

export const getConversationModel = async(conversationId: number)  => {
    return prisma.conversation.findUnique({
        where: {
            id: conversationId
        },
        include: {
            from: true,
            to: true,
            messages: {
                orderBy: {
                    createdAt: 'asc'
                },
            }
        }
    })
}

export const getAllConversationModel = async(idUser: number) => {
    
    const conversations = prisma.conversation.findMany({
        where: {
            AND: [
                {
                    OR:[
                        {fromId: idUser},
                        {toId: idUser}      
                    ],
                }
            ]
        },
        include: {
            from: {
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                }
            },
            to: {
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                }
            },
            // include last message of the conversation
            messages: {
                orderBy: {
                    createdAt: 'desc'
                },
                take: 1,
                select: {
                    content: true,
                    userId: true,
                    createdAt: true,
                }
            }
        }
    });
    
    return conversations;
}