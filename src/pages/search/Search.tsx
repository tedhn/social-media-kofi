import React, { useState } from "react";
import { InputBox, PageContainer } from "~/index.styled";

const Search = () => {
	const [query, setQuery] = useState("");
	// useEffect(() => {
	// 	const debounce = window.addEventListener("keypress", () => {});

	// 	return () => {
	// 		second;
	// 	};
	// }, [third]);

	return (
		<PageContainer>
			<InputBox type='text' placeholder='Search' />
			<div>Search</div>
		</PageContainer>
	);
};

export default Search;
