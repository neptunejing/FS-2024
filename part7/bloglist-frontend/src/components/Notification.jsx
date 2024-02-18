import { useSelector } from 'react-redux';

const Notification = () => {
	const payload = useSelector((state) => state.notification);
	if (payload === null || payload.message === null) return null;
	const { message, type } = payload;

	const style = {
		color: type === 'success' ? 'green' : 'red',
		background: 'lightgrey',
		fontSize: 20,
		borderStyle: 'solid',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	};

	return <div style={style}>{message}</div>;
};

export default Notification;
