import React, { FC, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { getPosts } from "~/api";
import { Card } from "~/components";
import Modal from "~/components/modal/Modal";
import { UserContext, userContextType } from "~/context/UserContext";
import {
	InputBox,
	PageContainer,
	PrimaryButton,
	SecondaryButton,
} from "~/index.styled";

export interface PostType {
	id: number;
	caption: string;
	image_id: number;
	user_id: number;
}

// initial={{ y: -200, opacity: 0 }}
// 					animate={{ y: 0, opacity: 1 }}
// 					exit={{ y: -200, opacity: 0 }}

const Home = () => {
	const navigate = useNavigate();

	const { jwt } = useContext(UserContext) as userContextType;

	const [posts, setPosts] = useState([]);

	const [isShowModal, setShowModal] = useState<boolean>(false);

	const closeModal = (value: boolean) => {
		setShowModal(value);
	};

	useEffect(() => {
		if (jwt !== "") {
			handleLoad();
		} else {
			navigate("/");
		}
	}, []);

	const handleLoad = async () => {
		const postsData = await getPosts(jwt);

		setPosts(
			postsData.data.map((post: any) => {
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
		<PageContainer
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -50 }}
			transition={{ duration: 0.3 }}>
			<AnimatePresence>
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
			</AnimatePresence>

			<motion.div className='flex justify-between '>
				<div className='pb-8 text-4xl font-bold'>Feeds</div>

				<div className='flex items-center gap-4 self-start'>
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
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
				className='flex flex-wrap gap-12 justify-evenly '>
				{posts.map((post: PostType, index: number) => {
					return (
						<motion.div
							// initial={{ opacity: 0, y: 100 }}
							// animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.1 }}>
							<Card key={post.id} post={post} />
						</motion.div>
					);
				})}
			</motion.div>
		</PageContainer>
	);
};

export default Home;
