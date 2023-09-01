import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload;
		},
		appendBlog(state, action) {
			state.push(action.payload);
		},
	},
});

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		dispatch(setBlogs(blogs));
	};
};

export const createBlog = (newBlog, user) => {
	return async (dispatch) => {
		const blog = await blogService.create(newBlog);

		dispatch(
			appendBlog({
				...blog,
				user: {
					username: user.username,
					name: user.name,
					id: blog.user,
				},
			})
		);
	};
};

export const { setBlogs, appendBlog } = blogSlice.actions;
export default blogSlice.reducer;
