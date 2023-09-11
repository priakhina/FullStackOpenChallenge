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

export const updateBlog = (updatedBlog) => {
	return async (dispatch, getState) => {
		const { likes, comments } = await blogService.update(
			updatedBlog.id,
			updatedBlog
		);

		const { blogs } = getState();
		const updatedBlogs = blogs.map((blog) =>
			blog.id !== updatedBlog.id ? blog : { ...blog, likes, comments }
		);
		dispatch(setBlogs(updatedBlogs));
	};
};

export const deleteBlog = (id) => {
	return async (dispatch, getState) => {
		await blogService.delete(id);

		const { blogs } = getState();
		const updatedBlogs = blogs.filter((blog) => blog.id !== id);
		dispatch(setBlogs(updatedBlogs));
	};
};

export const { setBlogs, appendBlog } = blogSlice.actions;
export default blogSlice.reducer;
