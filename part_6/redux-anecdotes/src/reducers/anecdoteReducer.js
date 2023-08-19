const anecdotesAtStart = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

export const voteAnecdote = (id) => ({
	type: "VOTE_ANECDOTE",
	payload: { id },
});

export const createAnecdote = (content) => ({
	type: "CREATE_ANECDOTE",
	payload: { content },
});

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
	switch (action.type) {
		case "VOTE_ANECDOTE":
			const id = action.payload.id;
			const anecdoteToVote = state.find((a) => a.id === id);
			const changedAnecdote = {
				...anecdoteToVote,
				votes: anecdoteToVote.votes + 1,
			};
			return state.map((anecdote) =>
				anecdote.id !== id ? anecdote : changedAnecdote
			);
		case "CREATE_ANECDOTE":
			const content = action.payload.content;
			return state.concat(asObject(content));
		default:
			return state;
	}
};

export default anecdoteReducer;