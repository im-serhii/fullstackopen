import Input from "./Input.jsx";

const Filter = ({searchHandler, value}) => {
	return (
		<div>
			filter shown with
			<Input Change={searchHandler} value={value}/>
		</div>
	)
}
export default Filter
