const Notification = ({ message, type }) => {
    const className = `notification ${type}`;

    if (message === null) {
        return null;
    }

    return (
        <div className={className}>
            <span>{type}</span>
            {message}
        </div>
    );
};

export default Notification;
