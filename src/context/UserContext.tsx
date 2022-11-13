import React, { createContext, FC, useState } from "react";

export interface userContextType {
	isLoggedIn: boolean;
	jwt: string;
	user: any;
	updateJWT: (jwt: string) => void;
	updateUser: (user: any) => void;
}

interface propTypes {
	children: React.ReactNode;
}

export const UserContext = createContext<userContextType | null>(null);

const UserContextProvider: FC<propTypes> = ({ children }) => {
	const [jwt, setJWT] = useState("");
	const [user, setUser] = useState("");
	const [isLoggedIn, setLoggedIn] = useState(true);

	const updateJWT = (jwt: string) => {
		console.log(jwt);
		setJWT(jwt);
	};

	const updateUser = (user: any) => {

		setUser(user);
	};

	return (
		<UserContext.Provider
			value={{ isLoggedIn, jwt, user, updateJWT, updateUser }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
