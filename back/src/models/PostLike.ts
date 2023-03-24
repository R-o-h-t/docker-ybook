import { PrismaClient,PostLike, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const likePostModel = async (data: Prisma.PostLikeCreateInput): Promise<PostLike> => {
    return await prisma.postLike.create({
        data
    })
}

export const unlikePostModel = async (id: number): Promise<PostLike> => {
    return await prisma.postLike.delete({
        where: {
            id
        }
    })
}

export const getLikedPostsModel = async (userId: number): Promise<PostLike[]> => {
    return await prisma.postLike.findMany({
        where: {
            userId
        }
    })
}

export const getPostLikesModel = async (postId: number): Promise<PostLike[]> => {
    return await prisma.postLike.findMany({
        where: {
            postId
        }
    })
}
