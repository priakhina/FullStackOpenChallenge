import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

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
			const content = action.payload;
			return state.concat(asObject(content));
		},
		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { voteAnecdote, createAnecdote, setAnecdotes } =
	anecdoteSlice.actions;
export default anecdoteSlice.reducer;
