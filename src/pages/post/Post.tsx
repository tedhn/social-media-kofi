import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { PageContainer, ShadowDiv } from "~/index.styled";
import { UserContext, userContextType } from "~/context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import { getImages, getPosts, getUser } from "~/api";
import Heart from "~/components/heart/Heart";

const Post = () => {
	const navigate = useNavigate();
	const params = useParams();

	const { jwt, user } = useContext(UserContext) as userContextType;
	const [post, setPost] = useState<{
		id: number | null;
		username: string;
		userImageUrl: string;
		image_url: string;
		caption: string;
	}>({ id: null, username: "", userImageUrl: "", image_url: "", caption: "" });

	useEffect(() => {
		if (jwt !== "") {
			handleLoad();
		} else {
			navigate("/");
		}
	}, []);

	const handleLoad = async () => {
		const postData = await getPosts(jwt, params.id);

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
			username: userData.username,
			userImageUrl: userImage.url,
			image_url: postImage.url,
			caption: postData.data.attributes.caption,
		});
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
				Back
			</div>

			<div className='w-1/2 mx-auto'>
				<div className=' pb-4'>
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
