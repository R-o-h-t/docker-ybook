import { ModalsProvider } from "@mantine/modals";
import { Users } from "./views/Friends/Users";
import { LoginView } from "./views/Login/Login";
import FormRegister from "./views/Login/FormRegister";
import { Route, Routes } from "react-router-dom";
import BottomNavBar from "./components/shared/Navbar/BottomNavBar";
import Profil from "./views/Profile/Profil";
import { MantineProvider } from "@mantine/core";
import Home from "./views/Home/Home";
import { NotificationsProvider } from "@mantine/notifications";
import { Friends } from "./views/Friends/Friends";
import { ConversationsList } from "./views/Conversations/ConversationsList";
import { ConversationProvider } from "./providers/ConversationProvider";
import { ConversationDetail } from "./views/Conversations/ConversationDetail";

function App() {
  return (
    <div className="App">
      <MantineProvider withNormalizeCSS>
        <NotificationsProvider>
          <ModalsProvider>
            <Routes>
              <Route path="/" element={<LoginView />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/register" element={<FormRegister />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/profil" element={<Profil />} />
              <Route path="/users" element={<Users />} />
              <Route
                path="/conversationslist"
                element={
                  <ConversationProvider>
                    <ConversationsList />
                  </ConversationProvider>
                }
              />
              <Route
                path="/conversationslist"
                element={
                  <ConversationProvider>
                    <ConversationsList />
                  </ConversationProvider>
                }
              />
              <Route
                path="/conversations/:idConversation"
                element={<ConversationDetail />}
              />
            </Routes>
            <BottomNavBar></BottomNavBar>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </div>
  );
}

export default App;
