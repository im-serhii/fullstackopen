import "./style.css"

const Notification = ({status, name}) => {
	if (status === null) return null;

	let text;
	if (status === 'success') {
		text = `${name} added`;
	} else if (status === 'delete') {
		text = `${name} deleted`;
	} else if (status === 'update') {
		text = `${name} updated`;
	} else {
		text = `Information of ${name} has already been removed from server`;
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
