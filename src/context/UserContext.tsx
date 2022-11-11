import React, { createContext, FC, useState } from "react";

export interface userContextType {
	isLoggedIn: boolean;
	jwt: string;
	updateJWT: (jwt: string) => void;
}

interface propTypes {
	children: React.ReactNode;
}

export const UserContext = createContext<userContextType | null>(null);

const UserContextProvider: FC<propTypes> = ({ children }) => {
	const [jwt, setJWT] = useState("");
	const [isLoggedIn, setLoggedIn] = useState(true);

	const updateJWT = (jwt: string) => {
		setJWT(jwt);
	};

	return (
		<UserContext.Provider value={{ isLoggedIn, jwt, updateJWT }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
