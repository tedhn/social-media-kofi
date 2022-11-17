import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PageContainer, ShadowDiv } from "~/index.styled";
import { UserContext, userContextType } from "~/context/UserContext";
import { deletePost, getImages, getSpecificPost, getUser } from "~/api";
import { Dropdown, Heart } from "~/components";

const Post = () => {
	const navigate = useNavigate();
	const params = useParams();

	const { jwt, user, updateNotification } = useContext(
		UserContext
	) as userContextType;
	const [post, setPost] = useState<{
		id: number;
		user_id: number;
		username: string;
		userImageUrl: string;
		image_url: string;
		caption: string;
	}>({
		id: 0,
		user_id: 0,
		username: "",
		userImageUrl: "",
		image_url: "",
		caption: "",
	});

	useEffect(() => {
		if (jwt !== "") {
			handleLoad();
		} else {
			navigate("/");
		}
	}, []);

	const handleLoad = async () => {
		try {
			const postData = await getSpecificPost(jwt, params.id);

			const postImage = await getImages(
				jwt,
				postData.data.attributes.image_id.toString()
			);
			const userData = await getUser(
				jwt,
				postData.data.attributes.user_id.toString()
			);

			const userImage = await getImages(jwt, userData.user_image_id.toString());

			setPost({
				id: postData.data.id,
				user_id: userData.id,
				username: userData.username,
				userImageUrl: userImage.url,
				image_url: postImage.url,
				caption: postData.data.attributes.caption,
			});
		} catch (e) {
			updateNotification("Error occured while loading posts", "#FF6464");
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await deletePost(jwt, id);
			updateNotification("Post deleted!", "#B3FFAE");
			navigate("/home");
		} catch (e) {
			updateNotification("Error occured while loading posts", "#FF6464");
		}
	};

	return (
		<PageContainer
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -50 }}
			transition={{ duration: 0.3 }}>
			<div
				className='mb-4 text-4xl font-bold cursor-pointer'
				onClick={() => navigate(-1)}>
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
						d='M15.75 19.5L8.25 12l7.5-7.5'
					/>
				</svg>
			</div>

			<div className='w-1/2 mx-auto'>
				<div className='flex items-center justify-between pb-4'>
					<div className='flex items-center gap-1 self-start'>
						<div className='w-8 h-8'>
							<img
								src={`http://localhost:1336${post.userImageUrl}`}
								alt='404'
								className='object-cover w-full h-full rounded-full'
							/>
						</div>
						<div className='font-medium'>{post.username}</div>
					</div>
					{post.user_id === user.id && (
						<Dropdown id={post.id} handleDelete={handleDelete!} />
					)}
				</div>
				<ShadowDiv className='w-full    rounded-md overflow-hidden mb-3'>
					<img
						src={`http://localhost:1336${post.image_url}`}
						alt='404'
						className='object-contain h-full w-full '
					/>
				</ShadowDiv>

				<div className='w-full 	flex justify-between py-3'>
					<div className='font-medium'>{post.caption}</div>

					{post.id && <Heart postId={post.id} userId={user.id} />}
				</div>
			</div>
		</PageContainer>
	);
};

export default Post;
