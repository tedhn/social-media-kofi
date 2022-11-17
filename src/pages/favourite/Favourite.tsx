import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { findUserFavourites, getPosts, getSpecificPost } from "~/api";
import { motion } from "framer-motion";
import { Card } from "~/components";
import { UserContext, userContextType } from "~/context/UserContext";
import { LoadingDiv, PageContainer } from "~/index.styled";
import { PostType } from "../home/Home";

export interface responseType {
	attributes: PostType;
	id: number;
}

const Favourite = () => {
	const navigate = useNavigate();
	const { jwt, user } = useContext(UserContext) as userContextType;
	const [posts, setPosts] = useState<Array<responseType>>([]);
	const [isLoading, setLoading] = useState(true);
	const [totalPosts, setTotalPosts] = useState(0);

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
			res.data.map(async (item: any) => {
				const { data } = await getSpecificPost(jwt, item.attributes.post_id);

				return data;
			})
		);

		setPosts(postArr);

		setTotalPosts(res.meta.pagination.total);
		setLoading(false);
	};

	const loadMorePosts = async () => {
		const res = await findUserFavourites(jwt, user.id, posts.length);

		const postArr = await Promise.all(
			res.data.map(async (item: any) => {
				const { data } = await getSpecificPost(jwt, item.attributes.post_id);

				return data;
			})
		);

		setPosts([...posts, ...postArr]);
	};

	return (
		<PageContainer
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -50 }}
			transition={{ duration: 0.3 }}>
			<div className='pb-8 text-4xl font-bold'>Favourites</div>
			{isLoading ? (
				<LoadingDiv> Loading posts</LoadingDiv>
			) : (
				<InfiniteScroll
					dataLength={posts.length}
					next={loadMorePosts}
					hasMore={posts.length < totalPosts}
					loader={<LoadingDiv>Loading posts</LoadingDiv>}
					endMessage={<LoadingDiv> End of favourites</LoadingDiv>}>
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className='flex flex-wrap gap-12 justify-evenly '>
						{posts.map((post: responseType) => (
							<Card key={post.id} post={{ ...post.attributes, id: post.id }} />
						))}
					</motion.div>
				</InfiniteScroll>
			)}
		</PageContainer>
	);
};

export default Favourite;
