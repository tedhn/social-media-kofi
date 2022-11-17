export interface responseType {
	attributes: PostType;
	id: number;
}

export interface PostType {
	id: number;
	caption: string;
	image_id: number;
	user_id: number;
}
