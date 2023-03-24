import {  Prisma, PrismaClient, ConversationMessage } from "@prisma/client"
const prisma = new PrismaClient()

export const createMessageModel = async(data: Prisma.ConversationMessageCreateInput) => {
    return prisma.conversationMessage.create({
        data
    })
}