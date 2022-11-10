import React from "react";
import styled from "styled-components";

import Image1 from "~/assets/image0.jpg";
import Image2 from "~/assets/image1.jpg";

const Card = () => {
	return (
		<StyledCard className='flex flex-col bg-white rounded-md w-72'>
			<div className='flex items-center justify-between px-2 py-3'>
				<div className='flex items-center gap-1'>
					<div className='w-8 h-8'>
						<img
							src={Image1}
							alt='404'
							className='object-cover w-full h-full rounded-full'
						/>
					</div>
					<div className='text-sm '>hhn</div>
				</div>

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
						d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
					/>
				</svg>
			</div>

			<div className='w-full'>
				<img src={Image1} alt='404' className='object-contain ' />
			</div>

			<div className='flex gap-2 px-2 py-3'>
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
						d='M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z'
					/>
				</svg>
			</div>
			<div className='px-2 pb-3 text-sm '>Some caption here</div>
		</StyledCard>
	);
};

const StyledCard = styled.div`
	border-radius: 12px;
	font-weight: 500;
	box-shadow: 3px 3px 3px 3px rgba(135, 133, 162, 0.25);
	/* transition: transform 0.3s ease;

	:hover {
		transform: translateY(-2px);
	} */
`;

export default Card;
