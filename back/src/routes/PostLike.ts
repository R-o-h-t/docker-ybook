import expres from 'express';
import PostLike from '../controllers/PostLike';
const PostLikeRouter = expres.Router();

PostLikeRouter.get("/:id", PostLike.getLikedPosts);
PostLikeRouter.post("/", PostLike.likePost);
PostLikeRouter.delete("/:id", PostLike.unlikePost);
PostLikeRouter.get("/post/:id", PostLike.getPostLikes);

export default PostLikeRouter;