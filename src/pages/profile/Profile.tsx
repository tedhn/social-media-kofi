import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import { deletePost, getUser, getUserPosts } from "~/api";
import { UserContext, userContextType } from "~/context/UserContext";
import { LoadingDiv, PageContainer } from "~/index.styled";
import { responseType } from "../favourite/Favourite";
import { Card } from "~/components";

const Profile = () => {
	const { jwt, user, updateNotification } = useContext(
		UserContext
	) as userContextType;

	const [posts, setPosts] = useState<any>([]);
	const [isLoading, setLoading] = useState(true);
	const [totalPosts, setTotalPosts] = useState(0);

	useEffect(() => {
		handleLoad();
	}, []);

	const handleLoad = async () => {
		const res = await getUserPosts(jwt, user.id);

		setPosts(res.data);
		setTotalPosts(res.meta.pagination.total);
		setLoading(false);
	};

	const loadMorePosts = async () => {
		const res = await getUserPosts(jwt, user.id, posts.length);

		setPosts([...posts, ...res.data]);
	};

	const handleDelete = async (id: number) => {
		await deletePost(jwt, id);
		setTotalPosts(totalPosts - 1);
		setPosts(posts.filter((post: any) => post.id !== id));

		updateNotification("Post Deleted!", "#B3FFAE");
	};

	return (
		<PageContainer
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -50 }}
			transition={{ duration: 0.3 }}>
			<div className='mb-4 text-4xl font-bold '>My Posts</div>

			{isLoading ? (
				<LoadingDiv> Loading posts</LoadingDiv>
			) : (
				<InfiniteScroll
					dataLength={posts.length}
					next={loadMorePosts}
					hasMore={posts.length < totalPosts}
					loader={<LoadingDiv>Loading posts</LoadingDiv>}
					endMessage={<LoadingDiv> End of your posts</LoadingDiv>}>
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className='flex flex-wrap gap-12 justify-evenly '>
						{posts.map((post: responseType, index: number) => {
							return (
								<motion.div
									key={post.id}
									// initial={{ opacity: 0, y: 100 }}
									// animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}>
									<Card
										post={{ ...post.attributes, id: post.id }}
										handleDelete={handleDelete}
										isMe={true}
									/>
								</motion.div>
							);
						})}
					</motion.div>
				</InfiniteScroll>
			)}
		</PageContainer>
	);
};

export default Profile;
