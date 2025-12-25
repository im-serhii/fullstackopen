import React, {useEffect, useState} from 'react'
import {getAll} from "./services/countriesService.js";
import Search from "./components/Search.jsx";
import RenderCondition from "./components/RenderCondition.jsx";

const App = () => {
	const [countries, setCountries] = useState([])
	const [query, setQuery] = useState('')

	useEffect(() => {
		getAll()
			.then(data => {
				setCountries(data)
			})
	}, [])

	const queryHandler = (e) => {
		setQuery(e.target.value)
	}

	const countriesToShow = query === '' ? [] : countries.filter(
		c => c.name.common.toLowerCase().includes(query.toLowerCase())
	)

	console.log(countriesToShow.length)
	console.log(countriesToShow)

	return (
		<div>
			<div>
				find countries
				<Search queryHandler={queryHandler} query={query}/>
			</div>
			<RenderCondition data={countriesToShow} />
		</div>
	)
}
export default App
