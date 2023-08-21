import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
		updateAnecdote(state, action) {
			const updatedAnecdote = action.payload;
			return state.map((anecdote) =>
				anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
			);
		},
		appendAnecdote(state, action) {
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

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(appendAnecdote(newAnecdote));
	};
};

export const voteAnecdote = (anecdote) => {
	return async (dispatch) => {
		const upvotedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
		const updatedAnecdote = await anecdoteService.update(
			anecdote.id,
			upvotedAnecdote
		);
		dispatch(updateAnecdote(updatedAnecdote));
	};
};

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
	anecdoteSlice.actions;
export default anecdoteSlice.reducer;
