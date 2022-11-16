import React from "react";
import { PageContainer } from "~/index.styled";

const Profile = () => {
	return (
		<PageContainer
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -50 }}
			transition={{ duration: 0.3 }}>
			<div>Profile</div>
		</PageContainer>
	);
};

export default Profile;
