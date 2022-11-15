import { useContext } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";

import { Home, Login, Post, Register, Search } from "./pages";
import { Nav } from "./components";
import { UserContext, userContextType } from "./context/UserContext";
import Favourite from "./pages/favourite/Favourite";

function App() {
	const { jwt } = useContext(UserContext) as userContextType;

	return (
		<div className=' grid grid-cols-12 bg-brown/20'>
			{jwt && <Nav />}

			<Routes>
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
			</Routes>
		</div>
	);
}

// TODO NOTIFICATIONS
// TODO LOADING
// TODO Search functionality
// TODO Profile Page
// TODO Post Page
// TODO Search Page
// TODO Animation
// TODO Favourite FUnctionality
// TODO Nav Bar Collaspe

export default App;
