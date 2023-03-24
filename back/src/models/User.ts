import { PrismaClient, User, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const fakedataUser = [
    { id: 1, name: "Dimitri" },
]


export const getAllUsersModel = async (): Promise<User[]> => {
    return await prisma.user.findMany({
        include: {
            blockedByUsers: {
                select: {
                    id: true,
                }
            }
        },
    })
}

export const getModelUser = async (id: number): Promise<User | null> => {
    return await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            blockedUsers: {
                select: {
                    firstname: true,
                    lastname: true,
                    email: true,
                }
            }
        }
    })
}

//create a new user in the database
export const createUserModel = async (data: Prisma.UserCreateInput): Promise<User> => {
    return await prisma.user.create({
        data
    })
}


export const addBlockedUser = async (id: number, data:any): Promise<User> => {
    return await prisma.user.update({
        where: {
            id
        },
        data: {
            blockedUsers: {
                connect: { id: data }
            }
        }
    })
}

export const removeBlockedUser = async (id: number, data:any): Promise<User> => {
    return await prisma.user.update({
        where: {
            id
        },
        data: {
            blockedUsers: {
                disconnect: { id: data }
            }
        }
    })
}