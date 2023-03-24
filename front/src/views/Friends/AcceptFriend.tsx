import { ScrollArea, Table } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import apiBack from "../../utils/axios-api";
import { IFriendship } from "../../utils/Interface/Friendship";
import { rowsFriends } from "./rowsFriends";

export const AcceptFriend = () => {
  const [data, setData] = useState<IFriendship[]>([]);
  const [loading, setLoading] = useState(true);

  //useAuth
  const AuthId = useAuthUser();

  useEffect(() => {
    apiBack.get(`/friendship/friends/${AuthId}`).then((response) => {
      setData(response.data.reverse());
      setLoading(false);
    });
  }, []);

  return (
    <ScrollArea className="pt-3 pb-20">
      <Table verticalSpacing="md">
        {data.length > 0 ? (
          <tbody>{rowsFriends(data)}</tbody>
        ) : (
          <tbody>
            <span className="italic">
              Mieux vaut être seul que mal accompagné !
            </span>
          </tbody>
        )}
      </Table>
    </ScrollArea>
  );
};
