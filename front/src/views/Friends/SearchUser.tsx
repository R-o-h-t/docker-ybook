import { useEffect, useState } from "react";
import {
  Table,
  ScrollArea,
  Group,
  Text,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import {
  IconSearch,
  IconUserPlus,
  IconX,
  IconCheck,
  IconUserOff,
} from "@tabler/icons";
import apiBack from "../../utils/axios-api";
import { IUser } from "../../utils/Interface/User";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useAuthUser } from "../../hooks/useAuthUser";

export function SearchUser() {
  const [data, setData] = useState<IUser[]>([]);
  const [search, setSearch] = useState("");
  const [searchVoid, setSearchVoid] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const AuthId = useAuthUser();

  useEffect(() => {
    apiBack.get("/user").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }, [searchVoid, isBlocked]);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    value ? setSearchVoid(false) : setSearchVoid(true);
    setSearch(value);

    setData(
      data.filter((item) => item.firstname.toLowerCase().includes(value.toLowerCase())
      || item.lastname.toLowerCase().includes(value.toLowerCase()) || item.email.toLowerCase().includes(value.toLowerCase())
      )
    );

  };

  const handleAddFriends = (UserId: number) => {
    showNotification({
      id: `add-friends-${UserId}`,
      loading: true,
      title: "Checking...",
      message: "Vérification de votre demande d'amis",
      autoClose: true,
      disallowClose: false,
    });

    apiBack.get(`/friendship/requests/${AuthId}`).then((response) => {
      const isAlreadySending = response.data.find(
        (request: any) => request.fromId === AuthId && request.toId === UserId
      );
      if (isAlreadySending) {
        updateNotification({
          id: `add-friends-${UserId}`,
          loading: false,
          title: "Impossible d'envoyer la demande",
          message: "Vous avez déjà envoyé une demande à cet utilisateur",
          autoClose: true,
          disallowClose: false,
        });
      } else {
        apiBack
          .post("/friendship/add", { fromId: AuthId, toId: UserId })
          .then(() => {
            updateNotification({
              id: `add-friends-${UserId}`,
              loading: false,
              title: "Demande envoyée",
              message: "Votre demande d'amis a bien été envoyée",
              color: "green",
              icon: <IconCheck size={18} />,
              autoClose: true,
              disallowClose: false,
            });
          })
          .catch((error) => {
            console.log(error);
            updateNotification({
              id: `add-friends-${UserId}`,
              loading: false,
              title: "Erreur",
              message:
                "Une erreur est survenue lors de l'envoi de votre demande",
              color: "red",
              icon: <IconX size={18} />,
              autoClose: true,
              disallowClose: false,
            });
          });
      }
    });
  };

  const blockUser = (UserId: number) => {
    apiBack
      .put(`/user/block/${AuthId}`, { userId: UserId })
      .then(() => {
        showNotification({
          id: "block-user",
          loading: false,
          title: "Utilisateur bloqué",
          message: "L'utilisateur a bien été bloqué",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: true,
          disallowClose: false,
        });
        setIsBlocked(!isBlocked);
      })
      .catch((error) => {
        console.log(error);
        showNotification({
          id: "block-user",
          loading: false,
          title: "Erreur",
          message: "Une erreur est survenue lors du blocage de l'utilisateur",
          color: "red",
          icon: <IconX size={18} />,
          autoClose: true,
          disallowClose: false,
        });
      });
  };

  const unblockUser = (UserId: number) => {
    apiBack
      .put(`/user/unblock/${AuthId}`, { userId: UserId })
      .then(() => {
        showNotification({
          id: "unblock-user",
          loading: false,
          title: "Utilisateur débloqué",
          message: "L'utilisateur a bien été débloqué",
          color: "green",
          icon: <IconCheck size={18} />,
          autoClose: true,
          disallowClose: false,
        });
        setIsBlocked(!isBlocked);
      })
  };

  const rows = data.map((row) => (
    <tr key={row.email}>
      <td>{row.firstname}</td>
      <td>{row.lastname}</td>
      <td>{row.email}</td>
      <td>
        <Group position="right">
          <ActionIcon
            variant="filled"
            color="dark"
            onClick={() => handleAddFriends(row.id)}
          >
            <IconUserPlus size={14} />
          </ActionIcon>

          {row.blockedByUsers.some((user) => user.id === AuthId) ? (
            <ActionIcon
              variant="filled"
              color="green"
              onClick={() => unblockUser(row.id)}
            >
              <IconUserOff size={14} />
            </ActionIcon>
          ) : (
            <ActionIcon
              variant="filled"
              color="red"
              onClick={() => blockUser(row.id)}
            >
              <IconUserOff size={14} />
            </ActionIcon>
          )}
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea className="w-11/12 mx-auto mt-3 pb-20">
      <TextInput
        placeholder="Rechercher un utilisateur"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={(event) => handleSearchChange(event)}
      />
      <Table
        horizontalSpacing="xs"
        verticalSpacing="xs"
        fontSize="xs"
        sx={{ tableLayout: "fixed", minWidth: "100%" }}
      >
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
