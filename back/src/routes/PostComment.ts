import expres from 'express';
import PostComment from '../controllers/PostComment';
const PostCommentRouter = expres.Router();

PostCommentRouter.get("/:id", PostComment.getAllCommentOnPost);
PostCommentRouter.post("/", PostComment.createCommentOnPost);
PostCommentRouter.put("/:id", PostComment.editCommentOnPostsModel);
PostCommentRouter.delete("/:id", PostComment.deleteCommentOnPost);

export default PostCommentRouter;

