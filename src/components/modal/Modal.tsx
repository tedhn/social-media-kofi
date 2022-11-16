import React, { FC, useContext, useState } from "react";
import { motion } from "framer-motion";

import { createPost, updateUserImage, uploadImage } from "~/api";
import { UserContext, userContextType } from "~/context/UserContext";

interface PropTypes {
	render: (
		image: File | undefined,
		caption: string,
		setImage: React.Dispatch<React.SetStateAction<File | undefined>>,
		setCaption: React.Dispatch<React.SetStateAction<string>>,
		handleCreatePost: () => void,
		handleUpdateUserImage: () => void
	) => React.ReactNode;
	closeModal: (value: boolean) => void;
}

const Modal: FC<PropTypes> = ({ render, closeModal }) => {
	const { jwt, user } = useContext(UserContext) as userContextType;

	const [image, setImage] = useState<File>();
	const [caption, setCaption] = useState<string>("");

	const handleCreatePost = async () => {
		const { data } = await uploadImage(jwt, image!);

		createPost(jwt, caption, data[0].id, user.id);

		closeModal(false);

		// add success notification
	};
	const handleUpdateUserImage = async () => {
		const { data } = await uploadImage(jwt, image!);

		updateUserImage(jwt, data[0].id, user.id);

		closeModal(false);

		// add success notification
	};

	return (
		<div className='fixed w-full h-full bg-black/50 top-0 left-0 overflow-hidden'>
			<div className='relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2'>
				<motion.div
					initial={{ opacity: 0, y: -500 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -500 }}
					transition={{ duration: 0.3 }}
					className=' bg-white p-8 flex flex-col justify-between rounded-md items-center gap-8'>
					{render(
						image,
						caption,
						setImage,
						setCaption,
						handleCreatePost,
						handleUpdateUserImage
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default Modal;
