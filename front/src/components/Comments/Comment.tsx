import {
  Group,
  Menu,
  ActionIcon,
  Text, Textarea
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconCheck,
  IconDotsVertical, IconPencil,
  IconTrash
} from "@tabler/icons";
import { useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import { usePostContext } from "../../providers/PostProvider";
import apiBack from "../../utils/axios-api";
import { IPostComment } from "../../utils/Interface/Post";

interface CommentProps {
  comment: IPostComment;
  setUpdate: (value: boolean) => void;
}

export const Comment = (props: CommentProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState<string>("");
  const { post, dispatch } = usePostContext();

  //useAuth
  const authId = useAuthUser();
  const comment = props.comment;

  const handleDelete = (commentId: number) => {
    apiBack
      .delete(`/postcomment/${commentId}`)
      .then(() => {
        showNotification({
          id: "comment-deleted",
          loading: false,
          title: "Suppression réussie",
          message: "Votre commentaire a bien été supprimé",
          autoClose: true,
          icon: <IconCheck size={16} />,
          disallowClose: false,
        });
        props.setUpdate(true);
        dispatch({
          type: "UPDATE",
          payload: { ...post, nbComments: post.nbComments - 1 },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (comment: IPostComment) => {
    setIsEdit(!isEdit);
    setValue(comment.text);
  };

  const handleSubmit = () => {
    apiBack
      .put(`/postcomment/${comment.id}`, { userId: authId, text: value })
      .then(() => {
        showNotification({
          id: "comment-edited",
          loading: false,
          title: "Modification réussie",
          message: "Votre commentaire a bien été modifié",
          autoClose: true,
          icon: <IconCheck size={16} />,
          disallowClose: false,
        });
        props.setUpdate(true);
        setIsEdit(false);
      });
  };

  return (
    <Group position="apart" className="flex-nowrap" key={comment.id}>
      {isEdit ? (
        <Textarea
          rightSection={
            <ActionIcon
              size={28}
              radius="xl"
              color="green"
              variant="filled"
              className="self-start mt-2"
              disabled={!value}
              onClick={handleSubmit}
            >
              <IconPencil color="white" size={18} stroke={1.5} />
            </ActionIcon>
          }
          rightSectionWidth={45}
          placeholder="Ajouter un commentaire"
          variant="filled"
          className="w-full"
          size="md"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      ) : (
        <Text>
          <span className="font-bold">
            {comment.user.firstname[0]}. {comment.user.lastname} :
          </span>{" "}
          {comment.text}
        </Text>
      )}
      {comment.userId === authId && (
        <Menu transition="pop" withArrow position="left">
          <Menu.Target>
            <ActionIcon className="self-start">
              <IconDotsVertical size={16} stroke={1.5} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<IconPencil size={16} stroke={1.5} />}
              onClick={() => handleEdit(comment)}
            >
              Editer
            </Menu.Item>
            <Menu.Item
              icon={<IconTrash size={16} stroke={1.5} />}
              color="red"
              onClick={() => handleDelete(comment.id)}
            >
              Supprimer
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </Group>
  );
};
