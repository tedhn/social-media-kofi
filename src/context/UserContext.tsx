import React, { createContext, FC, useState } from "react";

export interface userContextType {
	isLoggedIn: boolean;
}

interface propTypes {
	children: React.ReactNode;
}

export const UserContext = createContext<userContextType | null>(null);

const UserContextProvider: FC<propTypes> = ({ children }) => {
	const [user, setUser] = useState({});
	const [isLoggedIn, setLoggedIn] = useState(true);

	return (
		<UserContext.Provider value={{ isLoggedIn }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
