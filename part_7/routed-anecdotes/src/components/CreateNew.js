import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateNew = ({ addNew }) => {
	const [content, setContent] = useState("");
	const [author, setAuthor] = useState("");
	const [info, setInfo] = useState("");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		addNew({
			content,
			author,
			info,
			votes: 0,
		});
		navigate("/");
	};

	return (
		<div>
			<h2>Create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					Content:{" "}
					<input
						name="content"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<div>
					Author:{" "}
					<input
						name="author"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</div>
				<div>
					URL for more info:{" "}
					<input
						name="info"
						value={info}
						onChange={(e) => setInfo(e.target.value)}
					/>
				</div>
				<button>Create</button>
			</form>
		</div>
	);
};

export default CreateNew;
