import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		voteAnecdote(state, action) {
			const id = action.payload;
			const anecdoteToVote = state.find((a) => a.id === id);
			const changedAnecdote = {
				...anecdoteToVote,
				votes: anecdoteToVote.votes + 1,
			};
			return state.map((anecdote) =>
				anecdote.id !== id ? anecdote : changedAnecdote
			);
		},
		createAnecdote(state, action) {
			state.push(action.payload);
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { voteAnecdote, createAnecdote, setAnecdotes } =
	anecdoteSlice.actions;
export default anecdoteSlice.reducer;
