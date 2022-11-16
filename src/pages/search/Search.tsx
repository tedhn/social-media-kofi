import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPost } from "~/api";
import { Card } from "~/components";
import { UserContext, userContextType } from "~/context/UserContext";
import { InputBox, PageContainer } from "~/index.styled";
import { responseType } from "../favourite/Favourite";

const Search = () => {
	const navigate = useNavigate();
	const { jwt } = useContext(UserContext) as userContextType;

	const [query, setQuery] = useState("");
	const [searchResults, setSearchResults] = useState<Array<responseType>>([]);

	useEffect(() => {
		const debounce = setTimeout(async () => {
			const res = await searchPost(jwt, query);

			setSearchResults(res);
		}, 1000);

		return () => clearTimeout(debounce);
	}, [query]);

	useEffect(() => {
		if (jwt === "") {
			navigate("/");
		}
	}, []);

	return (
		<PageContainer>
			<InputBox
				type='text'
				className='mb-8'
				placeholder='Search'
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setQuery(e.target.value)
				}
			/>

			{searchResults.length === 0 ? (
				<div className='text-center font-bold text-2xl'>No posts found </div>
			) : (
				<div className='flex flex-wrap gap-12 justify-evenly '>
					{searchResults.map((post) => {
						return (
							<Card key={post.id} post={{ ...post.attributes, id: post.id }} />
						);
					})}
				</div>
			)}
		</PageContainer>
	);
};

export default Search;
