
import { PrismaClient, Post, Prisma } from '@prisma/client'


const prisma = new PrismaClient()



export const getAllPostsModel = async (): Promise<Post[]> => {
    return await prisma.post.findMany({
        include: {
            user: true,
            postComments: true,
            postLikes: true,
        }
    })
}

export const getPostModel = async (id: number, options?: Prisma.PostFindUniqueArgs): Promise<Post | null> => {
    return await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            postComments: true,
            postLikes: true,
        }
    })
}

export const createPostModel = async (data: Prisma.PostCreateInput): Promise<Post> => {
    return await prisma.post.create({
        data
    })
}

export const updatePostModel = async (id: number, data: Prisma.PostUpdateInput): Promise<Post> => {
    return await prisma.post.update({
        where: {
            id
        },
        data
    })
}

export const deletePostModel = async (id: number): Promise<Post> => {
    await prisma.postLike.deleteMany({
        where: {
            postId: id
        }
    })
    await prisma.postComment.deleteMany({
        where: {
            postId: id
        }
    })
    return await prisma.post.delete({
        where: {
            id
        }
    })
}



export const togglePostLikeModel = async (postId: number, userId: number): Promise<Post> => {
    //find if the post is already liked by the user
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        },
        select: {
            postLikes: {
                where: {
                    userId
                }
            }
        },
    })

    //if the post is already liked by the user, remove the like
    if (post?.postLikes.length) {
        return prisma.post.update({
            where: {
                id: postId
            },
            data: {
                postLikes: {
                    deleteMany: {
                        userId
                    }
                }
            }
        })
    } else {
        //if the post is not liked by the user, add the like
        return prisma.post.update({
            where: {
                id: postId
            },
            data: {
                postLikes: {
                    create: {
                        userId
                    }
                }
            }
        })

    }

}

export const unlikePostModel = async (postId: number, userId: number): Promise<Post> => {
    return await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            postLikes: {
                disconnect: {
                    id: userId
                }
            }
        }
    })
}


