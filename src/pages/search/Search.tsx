import React from "react";
import { InputBox, PageContainer } from "~/index.styled";

const Search = () => {
	return (
		<PageContainer>
			<InputBox type='text' placeholder='Search' />
			<div>Search</div>
		</PageContainer>
	);
};

export default Search;
