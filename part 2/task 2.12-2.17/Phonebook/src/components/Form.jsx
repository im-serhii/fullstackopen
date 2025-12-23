import Input from "./Input.jsx";

const Form = ({onSubmit, nameValue, nameOnChange, numberValue, numberOnChange}) => {
	return (
		<form onSubmit={onSubmit}>
			<div>
				name: <Input value={nameValue} Change={nameOnChange} />
			</div>
			<div>
				number: <Input value={numberValue} Change={numberOnChange} />
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	)
}
export default Form
