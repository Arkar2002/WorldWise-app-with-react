import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlpostion } from "../hooks/useUrlpostion";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";

function Form() {
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  const [mapLat, mapLng] = useUrlpostion();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [cityName, setCityName] = useState();
  const [country, setCountry] = useState();
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [formError, setFormError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat: mapLat, lng: mapLng },
    };
    await createCity(newCity);
    navigate("/app");
  }

  useEffect(() => {
    const fetchFormCityData = async () => {
      try {
        setIsFormLoading(true);
        setFormError(null);
        const res = await fetch(
          `${BASE_URL}latitude=${mapLat}&longitude=${mapLng}`
        );
        const data = await res.json();
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Try Clicking somewhere else"
          );
        setCityName(data.locality || data.city);
        setCountry(data.country);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        setFormError(error.message);
      } finally {
        setIsFormLoading(false);
      }
    };

    fetchFormCityData();
  }, [mapLat, mapLng, formError]);

  if (isFormLoading) return <Spinner />;

  if (formError) return <Message message={formError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City Name</label>
        <input
          type="text"
          id="cityName"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date"></label>
        <ReactDatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat="dd/MM/yyyy"
        ></ReactDatePicker>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          style={{ resize: "none" }}
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <div className={styles.buttons}>
          <Button type="primary">Add</Button>
          <BackButton></BackButton>
        </div>
      </div>
    </form>
  );
}

export default Form;
