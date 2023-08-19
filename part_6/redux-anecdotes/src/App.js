import { useSelector, useDispatch } from "react-redux";

const App = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => dispatch({ type: "VOTE_ANECDOTE", payload: { id } });

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}{" "}
						{anecdote.votes === 1 ? "vote" : "votes"}{" "}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
			<h2>Create new</h2>
			<form>
				<div>
					<input />
				</div>
				<button>Create</button>
			</form>
		</div>
	);
};

export default App;
