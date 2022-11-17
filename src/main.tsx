import React from "react";
import ReactDOM from "react-dom/client";
import {  HashRouter } from "react-router-dom";

import UserContextProvider from "./context/UserContext";
import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<HashRouter>
			<UserContextProvider>
				<App />
			</UserContextProvider>
		</HashRouter>
	</React.StrictMode>
);
