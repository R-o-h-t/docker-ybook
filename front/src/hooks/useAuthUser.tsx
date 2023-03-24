import { useGlobalContext } from "../providers/GlobalProvider";

export const useAuthUser = () => {
    const {authUser} = useGlobalContext();
    return authUser;
}