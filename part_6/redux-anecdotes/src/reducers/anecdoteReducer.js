import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

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

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const { voteAnecdote, createAnecdote, setAnecdotes } =
	anecdoteSlice.actions;
export default anecdoteSlice.reducer;
