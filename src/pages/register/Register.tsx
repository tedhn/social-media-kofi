import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

import Image from "~/assets/login.gif";
import { InputBox, PrimaryButton, SecondaryButton } from "~/index.styled";
import { UserContext, userContextType } from "~/context/UserContext";

interface UserType {
	email: string;
	password: string;
	username: string;
	fullname: string;
}

const Login = () => {
	const navigate = useNavigate();

	const { updateJWT, updateUser, updateNotification, notification } =
		useContext(UserContext) as userContextType;

	const [user, setUser] = useState<UserType>({
		email: "",
		password: "",
		username: "",
		fullname: "",
	});

	const handleRegister = async () => {
		if (handleValidation() === true) {
			try {
				// creating strapi user account
				const res = await axios.post(
					"http://localhost:1336/api/auth/local/register",
					{
						email: user.email,
						password: user.password,
						username: user.username,
					}
				);

				// updating strapi user account to include fullname
				await axios.put(
					`http://localhost:1336/api/users/${res.data.user.id}`,
					{
						fullname: user.fullname,
						user_image_id: 21,
					},
					{
						headers: {
							Authorization: `Bearer ${res.data.jwt}`,
						},
					}
				);

				const userData = await axios.get(
					`http://localhost:1336/api/users/${res.data.user.id}`,
					{
						headers: {
							Authorization: `Bearer ${res.data.jwt}`,
						},
					}
				);

				updateJWT(res.data.jwt);
				updateUser(userData.data);
				navigate("/home");
			} catch (e) {
				// change this to toast notification

				updateNotification("Invalid Credentials", "#FF6464");
			}
		} else {
			// change this to toast notification
			updateNotification("Invalid Credentials", "#FF6464");
		}
	};

	// onChange Handler for Input fields
	const handleInputChange = (label: string, value: string) => {
		setUser({ ...user, [label]: value });
	};

	// input validation check
	const handleValidation = () => {
		if (user.password.length < 6) {
			return false;
		}

		return true;
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 50 }}
			transition={{ duration: 0.3 }}
			className='flex flex-col items-center justify-center h-screen col-start-5 col-end-9 gap-4'>
			<img src={Image} alt='404' className='w-44' />
			<h1 className='text-5xl font-bold text-center'>Kofi</h1>

			<form className='flex flex-col gap-4 my-6 '>
				<InputBox
					autoComplete='on'
					type='text'
					placeholder='Email'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleInputChange("email", e.target.value)
					}
				/>
				<InputBox
					autoComplete='on'
					type='text'
					placeholder='Full Name'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleInputChange("fullname", e.target.value)
					}
				/>
				<InputBox
					autoComplete='on'
					type='text'
					placeholder='Username'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleInputChange("username", e.target.value)
					}
				/>
				<InputBox
					autoComplete='on'
					type='password'
					placeholder='Password'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						handleInputChange("password", e.target.value)
					}
				/>
			</form>

			<div className='flex gap-4'>
				<SecondaryButton onClick={() => navigate("/login")}>
					Login
				</SecondaryButton>
				<PrimaryButton onClick={handleRegister}>Register</PrimaryButton>
			</div>
		</motion.div>
	);
};

export default Login;
