import React from 'react'
import SingleCountry from "./SingleCountry.jsx";

const CountriesList = ({data}) => {
	return (
		<div>
			{data.map((country) => (
				<SingleCountry key={country.name.official} country={country} />
			))}

		</div>
	)
}
export default CountriesList
