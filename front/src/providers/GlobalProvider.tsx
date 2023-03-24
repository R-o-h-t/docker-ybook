import React, {
	createContext,
	ReactElement,
	useContext,
	useState,
} from "react";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";

//context for global state
// add context for token from AWS Cognito

type GlobalContextType = {
	token: string;
	setAuthUser: React.Dispatch<React.SetStateAction<number>>;
	cognitoUser: AmazonCognitoIdentity.CognitoUser;
	setCognitoUser: React.Dispatch<
		React.SetStateAction<AmazonCognitoIdentity.CognitoUser>
	>;
	authUser: number;
};

const GlobalContext = createContext<GlobalContextType>(null as any);
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider: React.FC<{ children: ReactElement }> = ({
	children,
}) => {
	const [token] = useState<string>("");
	const [cognitoUser, setCognitoUser] =
		useState<AmazonCognitoIdentity.CognitoUser>(null as any);
	const [authUser, setAuthUser] = useState<number>(1);
	return (
		<GlobalContext.Provider
			value={{ token, authUser, setAuthUser, cognitoUser, setCognitoUser }}
		>
			{children}
		</GlobalContext.Provider>
	);
};
