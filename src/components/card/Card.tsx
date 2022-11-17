import { FC, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { PostType } from "~/index.types";
import { UserContext, userContextType } from "~/context/UserContext";
import { getImages, getUser } from "~/api";
import { LoadingDiv } from "~/index.styled";
import { Dropdown, Heart } from "~/components";

interface PropTypes {
	post: PostType;
	isMe?: boolean;
	handleDelete?: (id: number) => void;
}

const Card: FC<PropTypes> = ({ post, isMe = false, handleDelete }) => {
	const navigate = useNavigate();

	const { jwt, user, updateNotification } = useContext(
		UserContext
	) as userContextType;

	const [data, setData] = useState<{
		username: string;
		userImageUrl: string;
		image_url: string;
		caption: string;
	}>({ username: "", userImageUrl: "", image_url: "", caption: "" });

	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		handleLoad();
	}, []);

	const handleLoad = async () => {
		try {
			const [postImage, user] = await Promise.all([
				getImages(jwt, post.image_id.toString()),
				getUser(jwt, post.user_id.toString()),
			]);

			const userImage = await getImages(jwt, user.user_image_id.toString());

			setData({
				username: user.username,
				userImageUrl: userImage.url,
				image_url: postImage.url,
				caption: post.caption,
			});
			setLoading(false);
		} catch (e) {
			updateNotification("Error occured while loading posts", "#FF6464");
		}
	};

	return (
		<StyledCard className='flex flex-col bg-white rounded-md w-72 h-96'>
			{isLoading ? (
				<LoadingDiv>Loading Post</LoadingDiv>
			) : (
				<>
					<div className='flex justify-between px-2 py-3'>
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

						{isMe && <Dropdown id={post.id} handleDelete={handleDelete!} />}
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
					</div>
					<div className='px-2 pb-3 text-sm '>{data.caption}</div>
				</>
			)}
		</StyledCard>
	);
};

const StyledCard = styled(motion.div)`
	border-radius: 12px;
	font-weight: 500;
	box-shadow: 3px 3px 3px 3px rgba(135, 133, 162, 0.25);
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
