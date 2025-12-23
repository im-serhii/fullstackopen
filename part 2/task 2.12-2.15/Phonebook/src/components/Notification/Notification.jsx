import "./style.css"

const Notification = ({message, status}) => {
	if (message === null) return null;
	return (
		<div className='wrapper'>
			<div className={`notification ${status === 'success' ? "success" : "error"}`}>{message}</div>
		</div>
	)
}
export default Notification
