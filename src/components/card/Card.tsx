import React, { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { PostType } from "~/pages/home/Home";
import { UserContext, userContextType } from "~/context/UserContext";
import { getImages, getUser } from "~/api";
import Heart from "../heart/Heart";
import { useNavigate } from "react-router-dom";

interface PropTypes {
	post: PostType;
}

const Card: FC<PropTypes> = ({ post }) => {
	const navigate = useNavigate();

	const { jwt, user } = useContext(UserContext) as userContextType;

	const [data, setData] = useState<{
		username: string;
		userImageUrl: string;
		image_url: string;
		caption: string;
	}>({ username: "", userImageUrl: "", image_url: "", caption: "" });

	useEffect(() => {
		handleLoad();
	}, []);

	const handleLoad = async () => {
		const postImage = await getImages(jwt, post.image_id.toString());
		const user = await getUser(jwt, post.user_id.toString());

		const userImage = await getImages(jwt, user.user_image_id.toString());

		setData({
			username: user.username,
			userImageUrl: userImage.url,
			image_url: postImage.url,
			caption: post.caption,
		});
	};

	return (
		<StyledCard className='flex flex-col bg-white rounded-md w-72'>
			<div className='px-2 py-3'>
				<div className='flex items-center gap-1'>
					<div className='w-8 h-8'>
						<img
							src={`http://localhost:1336${data.userImageUrl}`}
							alt='404'
							className='object-cover w-full h-full rounded-full'
						/>
					</div>
					<div className='text-sm '>{data.username}</div>
				</div>
			</div>

			<div
				className='w-full h-64 overflow-hidden'
				onClick={() => navigate(`/posts/${post.id}`)}>
				<Image
					src={`http://localhost:1336${data.image_url}`}
					alt='404'
					className='object-cover h-full w-full '
				/>
			</div>

			<div className='flex gap-2 px-2 py-3'>
				<Heart postId={post.id} userId={user.id} />
				{/* <svg
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
				</svg> */}
			</div>
			<div className='px-2 pb-3 text-sm '>{data.caption}</div>
		</StyledCard>
	);
};

const StyledCard = styled.div`
	border-radius: 12px;
	font-weight: 500;
	box-shadow: 3px 3px 3px 3px rgba(135, 133, 162, 0.25);
	/* transition: transform 0.3s ease; */

	:hover {
		/* transform: translateY(-2px); */
		/* cursor: pointer; */
	}
`;

const Image = styled.img`
	-webkit-transition: all 0.3s ease-in-out;
	transition: all 0.3s ease-in-out;

	:hover {
		-webkit-transform: scale3d(1.2, 1.2, 1);
		transform: scale3d(1.2, 1.2, 1);
		cursor: pointer;
	}
`;

export default Card;
