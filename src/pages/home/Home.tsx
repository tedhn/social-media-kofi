import axios from "axios";
import React, { FC, useContext, useEffect, useState } from "react";

import { getPosts, createPost, uploadImage } from "~/api";
import { Card } from "~/components";
import Modal from "~/components/modal/Modal";
import { UserContext, userContextType } from "~/context/UserContext";
import { InputBox, PrimaryButton, SecondaryButton } from "~/index.styled";

export interface PostType {
	id: number;
	caption: string;
	image_id: number;
	user_id: number;
}

const Home = () => {
	const { jwt, user } = useContext(UserContext) as userContextType;

	const [posts, setPosts] = useState([]);

	const [isShowModal, setShowModal] = useState<boolean>(false);

	const closeModal = (value: boolean) => {
		setShowModal(value);
	};

	useEffect(() => {
		handleLoad();
	}, []);

	const handleLoad = async () => {
		const postsData = await getPosts(jwt);

		setPosts(
			postsData.map((post: any) => {
				return {
					id: post.id,
					caption: post.attributes.caption,
					image_id: post.attributes.image_id,
					user_id: post.attributes.user_id,
				};
			})
		);
	};

	return (
		<div className='flex flex-col col-start-3 col-end-13 p-8 overflow-hidden'>
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
								<div className='font-bold text-3xl'>Create your posts</div>
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
										<InputBox
											onChange={(e) => setCaption(e.target.value)}
											type='text'
											placeholder='Caption'
										/>
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
									<PrimaryButton onClick={handleCreatePost}>
										Create
									</PrimaryButton>
								</div>
							</>
						);
					}}
				/>
			)}

			<div className='flex justify-between '>
				<InputBox type='text' placeholder='Search' />

				<div className='flex items-center gap-4'>
					{/* <div>
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
								d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z'
							/>
						</svg>
					</div>
					<div>
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
								d='M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0'
							/>
						</svg>
					</div> */}

					<PrimaryButton
						className='flex items-center justify-center w-40 gap-2'
						onClick={() => closeModal(true)}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-4 h-4'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 4.5v15m7.5-7.5h-15'
							/>
						</svg>

						<div>Create Post</div>
					</PrimaryButton>
				</div>
			</div>

			<div className='py-8 text-5xl font-bold'>Feeds</div>

			<div className='flex flex-wrap gap-12 justify-evenly '>
				{posts.map((post: PostType) => {
					return <Card key={post.id} post={post} />;
				})}
			</div>
		</div>
	);
};

export default Home;
