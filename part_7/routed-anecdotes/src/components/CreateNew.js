import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
	const { reset: resetContent, ...content } = useField("content");
	const { reset: resetAuthor, ...author } = useField("author");
	const { reset: resetInfo, ...info } = useField("info");

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		addNew({
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0,
		});
		navigate("/");
	};

	const handleReset = () => {
		resetContent();
		resetAuthor();
		resetInfo();
	};

	return (
		<div>
			<h2>Create a new anecdote</h2>
			<form onSubmit={handleSubmit}>
				<div>
					Content: <input {...content} />
				</div>
				<div>
					Author: <input {...author} />
				</div>
				<div>
					URL for more info: <input {...info} />
				</div>
				<button type="submit">Create</button>
				<button type="reset" onClick={handleReset}>
					Reset
				</button>
			</form>
		</div>
	);
};

export default CreateNew;
