import React, { useState } from "react";

const Heart = () => {
	const [isLiked, setLiked] = useState(false);

	const handleClick = () => {
		setLiked(!isLiked);
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
