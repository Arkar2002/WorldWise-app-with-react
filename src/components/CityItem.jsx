import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useFormatDate } from "../hooks/useFormatDate";

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, date, emoji, id, position } = city;
  const { formatDate } = useFormatDate();

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          city.id === currentCity.id && styles["cityItem--active"]
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            deleteCity(id);
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
