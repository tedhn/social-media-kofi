import axios from "axios";

export const getImages = async (jwt: string, id: string = "") => {
	const { data } = await axios.get(
		`http://localhost:1336/api/upload/files/${id}`,
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	);

	return data;
};

export const getUser = async (jwt: string, id: string = "") => {
	const { data } = await axios.get(`http://localhost:1336/api/users/${id}`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	return data;
};

export const getPosts = async (jwt: string, id: string = "") => {
	const { data } = await axios.get(`http://localhost:1336/api/posts/${id}`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	return data;
};

export const createPost = async (
	jwt: string,
	caption: string,
	image_id: number,
	user_id: number
) => {
	axios.post(
		"http://localhost:1336/api/posts",
		{
			data: { caption, image_id, user_id },
		},
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	);
};

export const uploadImage = async (jwt: string, image: File) => {
	try {
		let formData = new FormData();

		formData.append("files", image);

		const response = await axios.post(
			`http://localhost:1336/api/upload`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
					Authorization: `Bearer ${jwt}`,
				},
			}
		);

		return response;
	} catch (e: any) {
		return e;
	}
};

export const addToFavourite = async (
	jwt: string,
	postId: number,
	userId: number
) => {
	const res = await axios.post(
		"http://localhost:1336/api/favourites",
		{
			data: { post_id: postId, user_id: userId, user: userId },
		},
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	);

	return res.data;
};
export const removeFromFavourite = async (jwt: string, id: number) => {
	axios.delete(`http://localhost:1336/api/favourites/${id}`, {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});
};

export const getFavouriteId = async (
	jwt: string,
	postId: number,
	userId: number
) => {
	const { data } = await axios.get("http://localhost:1336/api/favourites", {
		headers: {
			Authorization: `Bearer ${jwt}`,
		},
	});

	return data.data.filter((item: any) => {
		if (
			item.attributes.post_id === postId &&
			item.attributes.user_id === userId
		) {
			return item.id;
		}
	});
};

export const findUserFavourites = async (jwt: string, userId: number) => {
	const { data } = await axios.get(
		`http://localhost:1336/api/favourites?filters[user_id][$eq]=${userId}`,
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		}
	);

	return data.data;
};

export const updateUserImage = async (
	jwt: string,
	image_id: number,
	user_id: number
) => {
	try {
		await axios.put(
			`http://localhost:1336/api/users/${user_id}`,
			{
				user_image_id: image_id,
			},
			{
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			}
		);
	} catch (e: any) {
		return e;
	}
};
