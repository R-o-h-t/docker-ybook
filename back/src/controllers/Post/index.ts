import updatePost from './handlers/updatePost';
import createPost from "./handlers/createPost";
import getAllPosts from "./handlers/getAllPosts";
import getPost from "./handlers/getPost";
import togglePostLike from "./handlers/togglePostLike";
import unlikePost from "./handlers/unlikePost";
import deletePost from "./handlers/deletePost";

export default {
    createPost,
    getAllPosts,
    updatePost,
    getPost,
    togglePostLike,
    unlikePost,
    deletePost
}