import React, { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getImages } from "~/api";
import { UserContext, userContextType } from "~/context/UserContext";
import { InputBox, PrimaryButton, SecondaryButton } from "~/index.styled";
import Modal from "../modal/Modal";
import styled from "styled-components";

const Nav = () => {
	const navigate = useNavigate();

	const { jwt, updateJWT, user, updateUser } = useContext(
		UserContext
	) as userContextType;

	const handleLogout = () => {
		updateJWT("");

		navigate("/");
	};

	const [isShowModal, setShowModal] = useState<boolean>(false);

	const closeModal = (value: boolean) => {
		setShowModal(value);
	};

	useEffect(() => {
		handleLoad();
	}, []);

	const handleLoad = async () => {
		const image = await getImages(jwt, user.user_image_id.toString());

		updateUser({ ...user, imageUrl: image.url });
	};
	return (
		<div className='sticky top-0 flex h-screen col-span-2 w-full'>
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
							handleUpdateUserImage
						) => {
							return (
								<>
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
				{/* 
			<div className='flex justify-center gap-1 mt-4 mb-8 text-xs font-bold text-center'>
				<div className='w-1/4'>
					<p>10</p>
					<p>Posts</p>
				</div>
				<div className='w-1/4'>
					<p>10</p>
					<p>Followers</p>
				</div>
				<div className='w-1/4'>
					<p>10</p>
					<p>Following</p>
				</div>
			</div> */}

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
						<div className='w-16 text-left '>Feeds</div>
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

						<div className='w-16 text-left '>Explore</div>
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

						<div className='w-16 text-left '>Favourite</div>
					</li>
					<li className='flex gap-2 px-4 py-2 rounded-md hover:cursor-pointer hover:bg-brown hover:text-white'>
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
								d='M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z'
							/>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
							/>
						</svg>

						<div className='w-16 text-left '>Setting</div>
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
					<div className='w-16 text-left ' onClick={handleLogout}>
						Log Out
					</div>
				</button>
			</div>
		</div>
	);
};

const StyledNav = styled.div`
	box-shadow: 3px 3px 3px 3px rgba(135, 133, 162, 0.25);
`;

export default Nav;
