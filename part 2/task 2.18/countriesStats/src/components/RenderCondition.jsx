import CountriesList from "./CountriesList.jsx";
import SingleCountry from "./SingleCountry.jsx";
import SingleCountryView from "./SingleCountryView.jsx";

const RenderCondition = ({ data }) => {
	if (!data || data.length === 0) return null;

	if (data.length > 10) {
		return (<><p>Too many matches, specify another filter</p>
		</>)
	}

	if (data.length === 1) {
		return <SingleCountryView data={data} />;
	}

	return <CountriesList data={data} />;
}

export default RenderCondition
