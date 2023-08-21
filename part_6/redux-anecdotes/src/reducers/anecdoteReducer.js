import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
	name: "anecdotes",
	initialState: [],
	reducers: {
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

export const voteAnecdote = (id) => {
	return async (dispatch, getState) => {
		const state = getState().anecdotes;

		const anecdoteToVote = state.find((a) => a.id === id);
		const updatedAnecdote = await anecdoteService.update(id, {
			...anecdoteToVote,
			votes: anecdoteToVote.votes + 1,
		});

		const anecdotes = state.map((a) =>
			a.id !== updatedAnecdote.id ? a : updatedAnecdote
		);
		dispatch(setAnecdotes(anecdotes));
	};
};

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
