import {
  ActionIcon,
  Avatar,
  Group,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import apiBack from "../../utils/axios-api";
import {
  IConversation,
  IConversationMessage,
} from "../../utils/Interface/Conversation";
import { io } from "socket.io-client";
import { useAuthUser } from "../../hooks/useAuthUser";

export const ConversationDetail: React.FC = () => {
  const [conversationMessages, setConversationMessages] = useState<
    IConversationMessage[]
  >([]);
  const [conversation, setConversation] = useState<IConversation>(null as any);
  const [ConversationReady, setConversationReady] = useState<boolean>(false);
  const userId = useAuthUser();
  const { idConversation } = useParams<Record<string, string>>();
  const theme = useMantineTheme();

  let inputRef = useRef<HTMLInputElement>(null);

  const handleMessage = (message: IConversationMessage) => {
    setConversationMessages((prevMessage) => [...prevMessage, message]);
  };

  const handleSubmit = (inputRef: React.RefObject<HTMLInputElement>) => {
    const content = inputRef.current?.value;
    if (content === "") return;
    apiBack
      .post("/user/20/messages", {
        conversationId: Number(idConversation),
        userId: userId,
        content: content,
      })
      .then((response) => {
        inputRef.current!.value = "";
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    apiBack
      .get<IConversation>(`user/${userId}/conversations/${idConversation}`)
      .then((response) => {
        setConversation(response.data);
        setConversationReady(true);
      })
      .catch((error: Error) => {
        console.log(error);
      });
  }, [idConversation]);

  useEffect(() => {
    if (ConversationReady === true) {
      setConversationMessages(conversation.messages);
    }
  }, [ConversationReady]);

  useEffect(() => {
    const socket = io(
      `http://${process.env.REACT_APP_BACKEND_URL}:${process.env.REACT_APP_BACKEND_PORT}/`
    );
    socket.emit("joinRoom", `room-${idConversation}`);
    socket.on("sendMessage", (message: IConversationMessage) => {
      handleMessage(message);
    });
  }, []);

  return (
    <div>
      <div className="flex flex-col h-full p-4 pb-20 gap-2.5">
        <h1 className="p-4">Conversation</h1>
        {conversationMessages && conversationMessages.length > 0 ? (
          conversationMessages.map((message) => {
            if (message.userId === userId) {
              return (
                <Group key={message.id} position="right">
                  <div className="max-w-[80%]">
                    <Text className="text-right" color="dimmed" size="xs">
                      {new Date(message.createdAt).toDateString()}{" "}
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </Text>
                    <div
                      className={"p-3 rounded-xl"}
                      style={{ backgroundColor: "#e9e9e9" }}
                    >
                      <Text className="word-break: break-all">
                        {message.content}
                      </Text>
                    </div>
                  </div>
                </Group>
              );
            } else {
              return (
                <Group
                  key={message.id}
                  noWrap={true}
                  className="items-start"
                  position="left"
                  spacing={0}
                >
                  <Avatar radius="xl" size="lg" />
                  <div className="max-w-[80%]">
                    <Text color="dimmed" size="xs">
                      {new Date(message.createdAt).toDateString()}{" "}
                      {new Date(message.createdAt).toLocaleTimeString()}
                    </Text>
                    <div
                      className={"p-3 rounded-xl bg-blue"}
                      style={{ backgroundColor: "#96CDFF" }}
                    >
                      <Text className="word-break: break-all">
                        {message.content}
                      </Text>
                    </div>
                  </div>
                </Group>
              );
            }
          })
        ) : (
          <div>Aucun messages</div>
        )}
        <TextInput
          className="mt-4"
          radius="xl"
          size="md"
          ref={inputRef}
          rightSection={
            <ActionIcon
              size={32}
              radius="xl"
              color={theme.primaryColor}
              variant="filled"
              onClick={() => handleSubmit(inputRef)}
            >
              {theme.dir === "ltr" ? (
                <IconArrowRight size={18} stroke={1.5} />
              ) : (
                <IconArrowLeft size={18} stroke={1.5} />
              )}
            </ActionIcon>
          }
          placeholder="Répondre"
          rightSectionWidth={42}
        />
      </div>
    </div>
  );
};
