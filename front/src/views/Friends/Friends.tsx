import { Group, Button, Tabs } from "@mantine/core";
import {
  IconCircleX,
  IconHeartHandshake,
  IconHourglassEmpty,
  IconMessageCircle,
  IconPhoto,
  IconSettings,
  IconUserSearch,
} from "@tabler/icons";
import { useNavigate } from "react-router-dom";
import { AcceptFriend } from "./AcceptFriend";
import { IgnoreFriend } from "./IgnoreFriend";
import { PendingFriend } from "./PendingFriend";

export const Friends = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[95%] mx-auto">
      <Group position="apart">
        <h1 className="text-center pt-6">Liste d'amis</h1>
        <Button
          leftIcon={<IconUserSearch size={18} />}
          color="dark"
          variant="outline"
          onClick={() => navigate("/users")}
        >
          Rechercher
        </Button>
      </Group>
      <Tabs
        color="dark"
        variant="pills"
        radius="md"
        orientation="vertical"
        defaultValue="accepted"
      >
        <Tabs.List>
          <Tabs.Tab value="accepted" icon={<IconHeartHandshake size={14} />}>
            Amis
          </Tabs.Tab>
          <Tabs.Tab value="pending" icon={<IconHourglassEmpty size={14} />}>
            En attente
          </Tabs.Tab>
          <Tabs.Tab value="ignored" icon={<IconCircleX size={14} />}>
            Ignorés
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="accepted" pl="xs">
          Vos vrais amis ✅ :
          <AcceptFriend />
        </Tabs.Panel>

        <Tabs.Panel value="pending" pl="xs">
          Ceux qui hésitent encore 😴 :
          <PendingFriend />
        </Tabs.Panel>

        <Tabs.Panel value="ignored" pl="xs">
          Ils ne vous aiment pas 😷 :
          <IgnoreFriend />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
