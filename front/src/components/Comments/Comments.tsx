import {
  Divider, Loader, Stack
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import apiBack from "../../utils/axios-api";
import { IPostComment } from "../../utils/Interface/Post";
import { AddComment } from "./AddComment";
import { Comment } from "./Comment";

interface CommentsProps {
  postId: number;
}

export const Comments = (props: CommentsProps) => {
  const [comments, setComments] = useState<IPostComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  //useAuth
  const authId = useAuthUser();

  useEffect(() => {
    apiBack.get(`/postcomment/${props.postId}`).then((response) => {
      setTimeout(() => {
        setComments(response.data);
        setIsLoading(false);
      }, 300);
    });
    setUpdate(false);
  }, [update]);

  return (
    <>
    {/* TODO : Animation slide down */}
      <Divider size="xs" variant="solid" className="mb-1" />
      <AddComment postId={props.postId} setNewComment={setUpdate}></AddComment>

      <Divider
        size="xs"
        variant="dotted"
        label="Commentaires"
        className="mb-1"
      />

      {isLoading ? (
        <Loader className="self-center" color="dark" variant="dots" size="sm" />
      ) : (
        <Stack spacing="xs" className="mt-2">
          {comments.map((comment: IPostComment) => (
            <Comment
              key={comment.id}
              setUpdate={setUpdate}
              comment={comment}
            ></Comment>
          ))}
        </Stack>
      )}
    </>
  );
};
