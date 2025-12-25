import axios from "axios";
const api_key = import.meta.env.VITE_API_KEY

const baseURL = `https://api.openweathermap.org/data/2.5/weather`

export const getWeather = (city) => {
	return axios.get(`${baseURL}?q=${city}&units=metric&appid=${api_key}`)
		.then((response) => response.data)
}
