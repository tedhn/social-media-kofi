import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

import { getImages } from "~/api";
import { UserContext, userContextType } from "~/context/UserContext";
import {
	InputBox,
	LoadingDiv,
	PrimaryButton,
	SecondaryButton,
} from "~/index.styled";
import Modal from "../modal/Modal";

const Nav = () => {
	const navigate = useNavigate();

	const { jwt, updateJWT, user, updateUser, updateNotification } = useContext(
		UserContext
	) as userContextType;

	const [isShowModal, setShowModal] = useState<boolean>(false);

	const handleLogout = () => {
		updateJWT("");
		updateUser({});
		navigate("/");
	};

	const closeModal = (value: boolean) => {
		setShowModal(value);
	};

	useEffect(() => {
		handleLoad();
	}, []);

	const handleLoad = async () => {
		try {
			const image = await getImages(jwt, user.user_image_id.toString());

			updateUser({ ...user, imageUrl: image.url });
		} catch (e) {
			updateNotification("Error occured while loading user data", "#FF6464");
		}
	};
	return (
		<motion.div
			initial={{ opacity: 0, x: -300 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -300 }}
			transition={{ duration: 0.3 }}
			className='sticky top-0 flex h-screen col-span-2 w-full z-10'>
			<div className='flex flex-col  text-center bg-white w-full '>
				{isShowModal && (
					<Modal
						closeModal={closeModal}
						render={(
							image,
							caption,
							setImage,
							setCaption,
							handleCreatePost,
							handleUpdateUserImage,
							isLoading
						) => {
							return (
								<>
									{isLoading ? (
										<LoadingDiv>Updating Profile Picture</LoadingDiv>
									) : (
										<>
											{" "}
											<div className='font-bold text-3xl'>
												Update your Profile Picture
											</div>
											{image ? (
												<>
													<div>
														<img
															src={URL.createObjectURL(image)}
															alt=''
															className='max-w-xs'
															onClick={() => setImage(undefined)}
														/>
													</div>
												</>
											) : (
												<>
													<InputBox
														onChange={(e) => setImage(e.target.files![0])}
														type='file'
													/>
												</>
											)}
											<div className='flex gap-4'>
												<SecondaryButton onClick={() => closeModal(false)}>
													Cancel
												</SecondaryButton>
												<PrimaryButton onClick={handleUpdateUserImage}>
													Update
												</PrimaryButton>
											</div>
										</>
									)}
								</>
							);
						}}
					/>
				)}

				<h1 className='my-8 text-4xl font-bold'>Kofi</h1>

				<div className='mb-8'>
					<div
						className='w-24 h-24 relative mx-auto mb-4 cursor-pointer text-transparent'
						onClick={() => closeModal(true)}>
						<div className='absolute  hover:bg-black/50 hover:text-white h-full w-full rounded-full '>
							<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
								Change
							</div>
						</div>
						<img
							src={`http://localhost:1336${user.imageUrl}`}
							alt='404'
							className='object-cover w-full h-full rounded-full'
						/>
					</div>

					<h2 className='text-xl font-medium'>{user.fullname}</h2>
					<h3 className='font-bold text-lightBrown'>@{user.username}</h3>
				</div>

				<ul className='flex flex-col items-center gap-6 font-bold place-self-center grow '>
					<li
						className='flex gap-2 px-4 py-2 rounded-md hover:cursor-pointer hover:bg-brown hover:text-white'
						onClick={() => navigate("/home")}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
							/>
						</svg>
						<div className='w-20 text-left '>Feeds</div>
					</li>
					<li
						className='flex gap-2 px-4 py-2 rounded-md hover:cursor-pointer hover:bg-brown hover:text-white'
						onClick={() => navigate("/search")}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
							/>
						</svg>

						<div className='w-20 text-left '>Explore</div>
					</li>
					<li
						className='flex gap-2 px-4 py-2 rounded-md hover:cursor-pointer hover:bg-brown hover:text-white'
						onClick={() => navigate("/favourite")}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6 hover:cursor-pointer'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
							/>
						</svg>

						<div className='w-20 text-left '>Favourite</div>
					</li>
					<li
						className='flex gap-2 px-4 py-2 rounded-md hover:cursor-pointer hover:bg-brown hover:text-white'
						onClick={() => navigate("/me")}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
							/>
						</svg>

						<div className='w-20 text-left '>My Posts</div>
					</li>
				</ul>

				<button className='flex justify-center gap-2 px-4 py-2 mb-8 font-bold rounded-md place-self-center hover:cursor-pointer hover:bg-brown hover:text-white'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
						/>
					</svg>
					<div className='w-20 text-left ' onClick={handleLogout}>
						Log Out
					</div>
				</button>
			</div>
		</motion.div>
	);
};

const StyledNav = styled.div`
	box-shadow: 3px 3px 3px 3px rgba(135, 133, 162, 0.25);
`;

export default Nav;
