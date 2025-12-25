import React from 'react'
import SingleCountry from "./SingleCountry.jsx";

const CountriesList = ({data, setSelectedCountry }) => {
	return (
		<div>
			{data.map((country) => (
				<SingleCountry setSelectedCountry={setSelectedCountry} key={country.name.official} country={country} />
			))}

		</div>
	)
}
export default CountriesList
