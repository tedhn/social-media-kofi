import React from "react";
import { useNavigate } from "react-router-dom";

import { InputBox, PrimaryButton, SecondaryButton } from "~/index.styled";

const Login = () => {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate("home");
	};

	return (
		<div className='flex flex-col items-center justify-center w-full h-full col-start-5 col-end-9 gap-4'>
			<h1 className='text-5xl font-bold text-center'>Kofi</h1>

			<div className='flex flex-col gap-4 my-6 '>
				<InputBox type='text' placeholder='Username' />
				<InputBox type='password' placeholder='Password' />
			</div>

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
