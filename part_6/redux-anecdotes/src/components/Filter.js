import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const Filter = () => {
	const dispatch = useDispatch();

	const style = {
		marginBottom: 20,
	};

	return (
		<div style={style}>
			Filter by text:{" "}
			<input
				type="text"
				placeholder="Input your text here"
				onChange={({ target }) => dispatch(filterChange(target.value))}
			/>
		</div>
	);
};

export default Filter;
