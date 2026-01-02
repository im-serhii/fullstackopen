import "./style.css"

const Notification = ({status, data}) => {
	if (status === null) return null;

	let text;
	if (status === 'success') {
		text = `${data} added`;
	} else if (status === 'delete') {
		text = `${data} deleted`;
	} else if (status === 'update') {
		text = `${data} updated`;
	} else {
		text = `${data}`;
	}

	return (
		<div className='wrapper'>
			<div className={`notification ${status}`}>
				{text}
			</div>
		</div>
	)
}
export default Notification
