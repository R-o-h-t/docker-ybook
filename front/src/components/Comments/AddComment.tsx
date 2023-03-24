import { ActionIcon, Textarea } from "@mantine/core";
import { IconMailFast } from "@tabler/icons";
import { useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { usePostContext } from "../../providers/PostProvider";
import apiBack from "../../utils/axios-api";

interface AddCommentProps {
  postId: number;
  setNewComment: (value: boolean) => void;
}

export function AddComment({ postId, setNewComment }: AddCommentProps) {
  const [value, setValue] = useState<string>("");
  const {post,dispatch} = usePostContext();

  //useAuth
  const authId = useAuthUser();

  const handleSubmit = () => {
    apiBack
      .post(`/postcomment`, {
        postId: postId,
        userId: authId,
        text: value,
      })
      .then((response) => {
        setNewComment(true);
        setValue("");
        dispatch({type:"UPDATE", payload: {...post, nbComments: post.nbComments + 1}})
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Textarea
      rightSection={
        <ActionIcon
          size={34}
          radius="xl"
          color="green"
          variant="filled"
          className="self-start mt-3"
          disabled={!value}
          onClick={() => handleSubmit()}
        >
          <IconMailFast color="black" size={24} stroke={1.5} />
        </ActionIcon>
      }
      rightSectionWidth={26}
      placeholder="Ajouter un commentaire"
      variant="unstyled"
      className="w-full h-10 mb-4"
      size="md"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
    />
  );
}
