import React, { createContext, ReactElement, useContext, useState } from "react";
import { IConversation } from "../utils/Interface/Conversation";
import { GetSetter } from "../utils/Interface/GetterSetter";

type ConversationContextType = {
    conversations: IConversation[]
    setConversations:  React.Dispatch<React.SetStateAction<IConversation[]>>
}

const ConversationContext = createContext<ConversationContextType>(null as any);
export const useConversationContext = () => useContext(ConversationContext);

export const ConversationProvider: React.FunctionComponent<{children: ReactElement}> = ({children}) => {
    const [conversations, setConversations] = useState<IConversation[]>(null as any);

    return (
        <ConversationContext.Provider value={{ conversations, setConversations}}>
            {children}
        </ConversationContext.Provider>
    )
}