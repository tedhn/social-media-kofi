import { useContext, useState } from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import styled from "styled-components";

import { Home, Login } from "./components";
import Nav from "./components/navbar/Nav";
import { UserContext, userContextType } from "./context/UserContext";

function App() {
	const { isLoggedIn } = useContext(UserContext) as userContextType;

	return (
		<div className='grid w-screen h-screen grid-cols-12 bg-brown/20'>
			{isLoggedIn && <Nav />}

			<Routes>
				<Route path='' element={<Login />} />
				<Route path='login' element={<Login />} />
				<Route path='home' element={<Home />} />
			</Routes>
		</div>
	);
}

const Hello = styled.div`
	background: transparent;
	border-radius: 3px;
	border: 2px solid palevioletred;
	color: palevioletred;
	margin: 0 1em;
	padding: 0.25em 1em;
`;

export default App;
