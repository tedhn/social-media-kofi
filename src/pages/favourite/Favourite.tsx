import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findUserFavourites, getPosts } from "~/api";
import { Card } from "~/components";
import { UserContext, userContextType } from "~/context/UserContext";
import { PageContainer } from "~/index.styled";
import { PostType } from "../home/Home";

export interface responseType {
	attributes: PostType;
	id: number;
}

const Favourite = () => {
	const navigate = useNavigate();
	const { jwt, user } = useContext(UserContext) as userContextType;
	const [posts, setPosts] = useState<Array<responseType>>([]);

	useEffect(() => {
		if (jwt !== "") {
			handleLoad();
		} else {
			navigate("/");
		}
	}, []);

	const handleLoad = async () => {
		const res = await findUserFavourites(jwt, user.id);

		const postArr = await Promise.all(
			res.map(async (item: any) => {
				const { data } = await getPosts(jwt, item.attributes.post_id);

				return data;
			})
		);
		setPosts(postArr);
	};

	return (
		<PageContainer>
			<div className='pb-8 text-4xl font-bold'>Favourites</div>
			<div className='flex flex-wrap gap-12 justify-evenly '>
				{posts.map((post: responseType) => (
					<Card key={post.id} post={{ ...post.attributes, id: post.id }} />
				))}
			</div>
		</PageContainer>
	);
};

export default Favourite;
