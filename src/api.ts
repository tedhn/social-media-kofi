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

	return data.data;
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
