import React, { FC, useContext, useEffect, useState } from "react";

import { addToFavourite, getFavouriteId, removeFromFavourite } from "~/api";
import { UserContext, userContextType } from "~/context/UserContext";
interface PropTypes {
	postId: number;
	userId: number;
}

const Heart: FC<PropTypes> = ({ postId, userId }) => {
	const [isLiked, setLiked] = useState(false);

	const { jwt } = useContext(UserContext) as userContextType;

	useEffect(() => {
		handleLoad();
	}, []);

	const handleLoad = async () => {
		const res = await getFavouriteId(jwt, postId, userId);

		if (res[0]) {
			setLiked(true);
		}
	};

	const handleClick = async () => {
		setLiked(!isLiked);

		if (isLiked) {
			const res = await getFavouriteId(jwt, postId, userId);
			await removeFromFavourite(jwt, res[0].id);
		} else {
			await addToFavourite(jwt, postId, userId);
		}
	};

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			fill={isLiked ? "#F88379" : "none"}
			viewBox='0 0 24 24'
			strokeWidth={1.5}
			onClick={handleClick}
			stroke={isLiked ? "#F88379" : "currentColor"}
			className='w-6 h-6 hover:cursor-pointer'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
			/>
		</svg>
	);
};

export default Heart;
