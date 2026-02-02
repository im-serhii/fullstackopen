import {useImperativeHandle, useState} from "react";

const Toggle = ({children, label, ref}) => {
	const [visible, setVisible] = useState(false);
	const hideWhenVisible = {display: visible ? "none" : ""};
	const showWhenVisible = {display: visible ? "" : "none"};

	const toggle = () => {
		setVisible(!visible);
	}

	useImperativeHandle(ref, () => {
			return {toggle}
		}
	)


	return (
		<>
			<div style={hideWhenVisible}>
				<button onClick={toggle}>{label}</button>
			</div>
			<div style={showWhenVisible}>
				{children}
				<button onClick={toggle}>cancel</button>
			</div>
		</>
	)
}
export default Toggle
