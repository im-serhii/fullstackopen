import React from "react";

const SingleCountry = ({country, setSelectedCountry}) => {
	return (
		<div>
			{country.name.common}
			<button onClick={() => setSelectedCountry(country)}>show</button>
		</div>
	)
}
export default SingleCountry
