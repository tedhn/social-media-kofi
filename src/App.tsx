import { useContext, useState } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import styled from "styled-components";

import { Home, Login, Register } from "./pages";
import { Nav } from "./components";
import { UserContext, userContextType } from "./context/UserContext";

function App() {
	const { isLoggedIn } = useContext(UserContext) as userContextType;

	return (
		<div className='grid grid-cols-12 bg-brown/20'>
			{isLoggedIn && <Nav />}

			<Routes>
				<Route path='' element={<Login />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='home' element={<Home />} />
			</Routes>
		</div>
	);
}

//TODO : handle api for login and register

export default App;
