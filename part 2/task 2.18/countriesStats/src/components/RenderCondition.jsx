import CountriesList from "./CountriesList.jsx";
import SingleCountry from "./SingleCountry.jsx";
import SingleCountryView from "./SingleCountryView.jsx";

const RenderCondition = ({ data, selectedCountry, setSelectedCountry}) => {
	if (!data || data.length === 0) return null;

	if (selectedCountry) {
		return <SingleCountryView data={[selectedCountry]} />;
	}

	if (data.length > 10) {
		return (<><p>Too many matches, specify another filter</p>
		</>)
	}

	if (data.length === 1) {
		return <SingleCountryView data={data} />;
	}

	return <CountriesList setSelectedCountry={setSelectedCountry} data={data} />;
}

export default RenderCondition
