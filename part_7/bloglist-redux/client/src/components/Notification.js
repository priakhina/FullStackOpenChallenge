import { useSelector } from "react-redux";

const Notification = () => {
	const notification = useSelector((state) => state);
	const { type, message } = notification;

	const className = `notification ${type}`;

	return (
		message && (
			<div className={className}>
				<span>{type}</span>
				{message}
			</div>
		)
	);
};

export default Notification;
