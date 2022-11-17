import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { searchPost } from "~/api";
import { Card } from "~/components";
import { UserContext, userContextType } from "~/context/UserContext";
import { InputBox, LoadingDiv, PageContainer } from "~/index.styled";
import { responseType } from "~/index.types";

const Search = () => {
	const navigate = useNavigate();
	const { jwt, updateNotification } = useContext(
		UserContext
	) as userContextType;

	const [query, setQuery] = useState("");
	const [isLoading, setLoading] = useState(true);
	const [totalPosts, setTotalPosts] = useState(0);

	const [searchResults, setSearchResults] = useState<Array<responseType>>([]);

	useEffect(() => {
		const debounce = setTimeout(async () => {
			try {
				const res = await searchPost(jwt, query);

				setSearchResults(res.data);
				setTotalPosts(res.meta.pagination.total);
				setLoading(false);
			} catch (e) {
				updateNotification("Error occured while loading posts", "#FF6464");
			}
		}, 1000);

		return () => clearTimeout(debounce);
	}, [query]);

	useEffect(() => {
		if (jwt === "") {
			navigate("/");
		}
	}, []);

	const searchMorePosts = async () => {
		try {
			const res = await searchPost(jwt, query, searchResults.length);
			setSearchResults([...searchResults, ...res.data]);
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
			<InputBox
				type='text'
				className='mb-8'
				placeholder='Search'
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setQuery(e.target.value)
				}
			/>

			{isLoading ? (
				<LoadingDiv> Loading posts</LoadingDiv>
			) : (
				<InfiniteScroll
					dataLength={searchResults.length}
					next={searchMorePosts}
					hasMore={searchResults.length < totalPosts}
					loader={<LoadingDiv>Loading posts</LoadingDiv>}
					endMessage={<LoadingDiv> End of favourites</LoadingDiv>}>
					<motion.div
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
						className='flex flex-wrap gap-12 justify-evenly '>
						{searchResults.map((post) => {
							return (
								<Card
									key={post.id}
									post={{ ...post.attributes, id: post.id }}
								/>
							);
						})}
					</motion.div>
				</InfiniteScroll>
			)}

			{/* {searchResults.length === 0 ? (
				<div className='text-center font-bold text-2xl'>No posts found </div>
			) : (
				<div className='flex flex-wrap gap-12 justify-evenly '></div>
			)} */}
		</PageContainer>
	);
};

export default Search;
