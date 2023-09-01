import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
	name: "blogs",
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload;
		},
		createBlog(state, action) {
			const { blog, user } = action.payload;

			state.push({
				...blog,
				user: {
					username: user.username,
					name: user.name,
					id: blog.user,
				},
			});
		},
	},
});

export const { setBlogs, createBlog } = blogSlice.actions;
export default blogSlice.reducer;
