import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    backgroundSize: "cover",
    backgroundImage: "url(assets/images/login.jpg)",
  },

  form: {
    height: "100%",
    maxWidth: "clamp(578px, 35%, 700px)",
    paddingTop: 80,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blur(10px)",
  },

  title: {
    color: "dark",
  },
}));
