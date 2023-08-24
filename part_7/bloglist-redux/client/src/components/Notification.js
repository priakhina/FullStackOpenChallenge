const Notification = ({ message, type }) => {
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
