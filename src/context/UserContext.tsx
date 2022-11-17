import React, { createContext, FC, useState } from "react";
import { deletePost } from "~/api";

export interface userContextType {
	isLoggedIn: boolean;
	jwt: string;
	user: any;
	updateJWT: (jwt: string) => void;
	updateUser: (user: any) => void;
	updateNotification: (label: string, bgColor: string) => void;
	notification: { label: string; bgColor: string; isShow: boolean };
}

interface propTypes {
	children: React.ReactNode;
}

export const UserContext = createContext<userContextType | null>(null);

const UserContextProvider: FC<propTypes> = ({ children }) => {
	const [jwt, setJWT] = useState("");
	const [user, setUser] = useState("");
	const [isLoggedIn, setLoggedIn] = useState(true);

	const [notification, setNotification] = useState({
		label: "",
		bgColor: "",
		isShow: false,
	});

	const updateJWT = (jwt: string) => {
		setJWT(jwt);
	};

	const updateUser = (user: any) => {
		setUser(user);
	};

	const updateNotification = (label: string, bgColor: string) => {
		setNotification({ label, bgColor, isShow: true });

		setTimeout(() => {
			setNotification({ ...notification, isShow: false });
		}, 3000);
	};

	return (
		<UserContext.Provider
			value={{
				isLoggedIn,
				jwt,
				user,
				updateJWT,
				updateUser,
				updateNotification,
				notification,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
