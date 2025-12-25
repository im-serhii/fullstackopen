import React from 'react'



const SingleCountryView = ({data}) => {
	console.log(data.flags)
	return (
		<div>{data.map(country => (
			<div key={country.name.official}>
				<h1>{country.name.common}</h1>
				<p>capital: {country.capital}</p>
				<p>area: {country.area}</p>
				<h2>languages</h2>
				<ul>{Object.values(country.languages).map(lang => (
					<li key={lang}>{lang}</li>
					))}
				</ul>
				<div>

						<img key={country.flags.alt} src={country.flags.png} alt={country.flags.alt}/>

				</div>
			</div>
			))}
		</div>
	)
}
export default SingleCountryView
