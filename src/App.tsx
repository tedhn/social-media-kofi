import { useContext } from "react";
import { Route, useLocation } from "react-router";
import { Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import {
	Home,
	Login,
	Post,
	Profile,
	Register,
	Search,
	Favourite,
} from "./pages";
import { Nav } from "./components";
import { UserContext, userContextType } from "./context/UserContext";
import { NotificationDiv } from "./index.styled";

function App() {
	const location = useLocation();
	const { jwt, notification } = useContext(UserContext) as userContextType;

	return (
		<div className=' grid grid-cols-12 bg-brown/20'>
			{jwt && <Nav />}
			{notification.isShow && (
				<NotificationDiv bgColor={notification.bgColor}>
					{notification.label}
				</NotificationDiv>
			)}

			<AnimatePresence mode='wait'>
				<Routes key={location.pathname} location={location}>
					<Route path='' element={<Login />} />
					<Route path='login' element={<Login />} />
					<Route path='register' element={<Register />} />
					<Route path='home' element={<Home />} />
					<Route path='search' element={<Search />} />
					<Route path='posts'>
						<Route path='' element={<Post />} />
						<Route path=':id' element={<Post />} />
					</Route>

					<Route path='favourite' element={<Favourite />} />
					<Route path='me' element={<Profile />} />
				</Routes>
			</AnimatePresence>
		</div>
	);
}

// TODO NOTIFICATIONS
// TODO Animation

export default App;
