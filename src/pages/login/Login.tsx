import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import Image from "~/assets/login.gif";
import { InputBox, PrimaryButton, SecondaryButton } from "~/index.styled";
import { UserContext, userContextType } from "~/context/UserContext";

const Login = () => {
	const navigate = useNavigate();

	const { updateJWT, updateUser, updateNotification } = useContext(
		UserContext
	) as userContextType;

	const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
	const [isDisabledButton, setDisabledButton] = useState(false);

	const handleLogin = async () => {
		setDisabledButton(true);

		try {
			const res = await axios.post("http://127.0.0.1:1336/api/auth/local", {
				identifier: loginInfo.email,
				password: loginInfo.password,
			});

			updateJWT(res.data.jwt);
			updateUser(res.data.user);

			setDisabledButton(false);
			navigate("/home");
		} catch (e) {
			setDisabledButton(false);
			updateNotification("Invalid Credentials", "#FF6464");
		}
	};

	const handleInputChange = (label: string, value: string) => {
		setLoginInfo({ ...loginInfo, [label]: value });
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -50 }}
			transition={{ duration: 0.3 }}
			className='h-screen flex flex-col items-center justify-center col-start-5 col-end-9 gap-4'>
			<img src={Image} alt='404' className='w-44' />
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
				<PrimaryButton onClick={handleLogin} disabled={isDisabledButton}>
					Login
				</PrimaryButton>
			</div>
		</motion.div>
	);
};

export default Login;
