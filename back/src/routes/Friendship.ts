import expres from 'express';
import Friendship from '../controllers/Friendship';
const FriendshipRouter = expres.Router();

FriendshipRouter.get("/:id", Friendship.getFriendship);
FriendshipRouter.get("/friends/:userId", Friendship.getFriends);
FriendshipRouter.post("/accept", Friendship.acceptFriendshipRequest);
FriendshipRouter.post("/ignore", Friendship.ignoreFriendshipRequest);
FriendshipRouter.get("/ignored/:userId", Friendship.getIgnoredFriendshipRequest);
FriendshipRouter.post("/add", Friendship.addFriendshipRequest);
FriendshipRouter.get("/requests/:userId", Friendship.getFriendshipRequests);
FriendshipRouter.delete("/:id", Friendship.deleteFriendship);


export default FriendshipRouter;