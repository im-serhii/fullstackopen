import {useEffect, useState} from "react";
import {getWeather} from "../services/weatherService.js";

const SingleCountryView = ({data}) => {
	const [weather, setWeather] = useState(null)
	const country = data[0]

	useEffect(() => {
		getWeather(country.capital)
			.then(data => {
				setWeather(data)
			})
	}, [country.capital])

	if (!weather) {
		return <div>loading weather</div>
	}

	const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

	return (
		<div>
			<h1>{country.name.common}</h1>
			<p>capital: {country.capital}</p>
			<p>area: {country.area}</p>
			<h2>languages</h2>
			<ul>
				{Object.values(country.languages).map(lang => (
					<li key={lang}>{lang}</li>
				))}
			</ul>
			<div>
				<img src={country.flags.png} alt={country.flags.alt}/>
			</div>
			<h1>weather for {country.capital}</h1>
			<p>temperature {weather?.main.temp} celsius</p>
			<img src={iconUrl} alt=""/>
			<p>wind {weather.wind.speed}m/s</p>
		</div>
	)
}
export default SingleCountryView
