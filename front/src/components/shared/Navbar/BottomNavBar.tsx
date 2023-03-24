import { ActionIcon, Modal } from "@mantine/core";
import React, { useState } from "react";
import IconNavbar from "../IconNavBar";
import styles from "./BottomNavBar.module.scss";

import { IconPlus } from "@tabler/icons";
import AddPost from "../AddPost";
import { useLocation, useNavigate } from "react-router-dom";

const BottomNavBar = () => {
  const [openNewPost, setOpenPost] = useState(false);
  const match = useLocation();
  const navigate = useNavigate();

  if (match.pathname === "/login" || match.pathname === "/register" || match.pathname === "/") {
    return null;
  }

  return (
    <div className={styles.navbar}>
      <Modal
        title="Publier un post"
        opened={openNewPost}
        onClose={() => setOpenPost(false)}
      >
        <AddPost setOpened={setOpenPost}></AddPost>
      </Modal>

      <div className="flex justify-around items-center h-full">
        <IconNavbar
          path="../assets/icon/Home.svg"
          name="Home"
          link="/home"
        ></IconNavbar>
        <IconNavbar
          path="../assets/icon/Message.svg"
          name="Message"
          link="/conversationslist"
        ></IconNavbar>
        <ActionIcon
          onClick={
            match.pathname === "/friends"
              ? () => navigate("/users")
              : () => setOpenPost(true)
          }
          radius="lg"
          variant="filled"
          color="dark"
          size="xl"
          className={styles.addbutton}
        >
          <IconPlus size={32} />
        </ActionIcon>
        <IconNavbar
          path="../assets/icon/People.svg"
          name="People"
          link="/friends"
        ></IconNavbar>
        <IconNavbar
          path="../assets/icon/Profil.svg"
          name="Parameters"
          link="/profil"
        ></IconNavbar>
      </div>
    </div>
  );
};

export default BottomNavBar;
