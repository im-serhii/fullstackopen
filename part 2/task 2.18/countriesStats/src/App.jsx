import React, {useEffect, useState} from 'react'
import {getAll} from "./services/countriesService.js";
import Search from "./components/Search.jsx";
import RenderCondition from "./components/RenderCondition.jsx";

const App = () => {
	const [countries, setCountries] = useState([])
	const [query, setQuery] = useState('')
	const [selectedCountry, setSelectedCountry] = useState(null)

	useEffect(() => {
		getAll()
			.then(data => {
				setCountries(data)
			})
	}, [])

	const queryHandler = (e) => {
		setQuery(e.target.value)
		setSelectedCountry(null)
	}

	const countriesToShow = query === '' ? [] : countries.filter(
		c => c.name.common.toLowerCase().includes(query.toLowerCase())
	)

	return (
		<div>
			<div>
				find countries
				<Search queryHandler={queryHandler} query={query}/>
			</div>
			<RenderCondition setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry} data={countriesToShow} />
		</div>
	)
}
export default App
