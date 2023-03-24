import { Center } from "@mantine/core";
import { useState, useEffect } from "react";
import apiBack from "../../utils/axios-api";
import { IUser } from "../../utils/Interface/User";
import { SearchUser } from "./SearchUser";

export const Users = () => {
    return (
        <Center className="flex flex-col">
            <h1 className="mt-5">Rechercher un utilisateur</h1>
            <SearchUser></SearchUser>
        </Center>
    )
}

            