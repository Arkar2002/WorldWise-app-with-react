import { useCities } from "../contexts/CitiesContext";
import styles from "./CitiesList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";

function CitiesList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Add City by clicking on the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CitiesList;
