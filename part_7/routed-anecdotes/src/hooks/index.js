import { useState } from "react";

export const useField = (name, type = "text") => {
	const [value, setValue] = useState("");

	const onChange = (e) => {
		setValue(e.target.value);
	};

	return { name, type, value, onChange };
};
