import { useCities } from "../contexts/CitiesContext";
import styles from "./CountriesList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";

function CountriesList() {
  const { cities, isLoading } = useCities();

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [
        ...arr,
        { country: city.country, emoji: city.emoji, id: city.id },
      ];
    else return arr;
  }, []);

  if (isLoading) return <Spinner />;

  if (!countries.length)
    return <Message message="Add Country by clicking on the map" />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountriesList;
