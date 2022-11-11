import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { InputBox, PrimaryButton, SecondaryButton } from "~/index.styled";
import { UserContext, userContextType } from "~/context/UserContext";

const Login = () => {
	const navigate = useNavigate();

	const { updateJWT } = useContext(UserContext) as userContextType;

	const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

	const handleLogin = async () => {
		try {
			const res = await axios.post("http://localhost:1336/api/auth/local", {
				identifier: loginInfo.email,
				password: loginInfo.password,
			});

			updateJWT(res.data.jwt);

			navigate("/home");
		} catch (e) {
			//change thsi to toast notification
			console.log(e);
		}
	};

	const handleInputChange = (label: string, value: string) => {
		setLoginInfo({ ...loginInfo, [label]: value });
	};

	return (
		<div className='h-screen flex flex-col items-center justify-center col-start-5 col-end-9 gap-4'>
			<h1 className='text-5xl font-bold text-center'>Kofi</h1>

			<form className='flex flex-col gap-4 my-6 '>
				<InputBox
					type='text'
					placeholder='Username'
					autoComplete='on'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleInputChange("email", e.target.value)
					}
				/>
				<InputBox
					type='password'
					placeholder='Password'
					autoComplete='on'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleInputChange("password", e.target.value)
					}
				/>
			</form>

			<div className='flex gap-4'>
				<SecondaryButton onClick={() => navigate("/register")}>
					Register
				</SecondaryButton>
				<PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
			</div>
		</div>
	);
};

export default Login;
