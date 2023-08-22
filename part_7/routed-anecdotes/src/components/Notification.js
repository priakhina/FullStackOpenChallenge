const Notification = ({ notification }) => {
	const style = {
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: "rgb(0, 0, 0)",
		padding: 10,
		marginTop: 20,
	};

	return notification && <div style={style}>{notification}</div>;
};

export default Notification;
