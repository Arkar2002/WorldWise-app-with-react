import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useUrlpostion } from "../hooks/useUrlpostion";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import useGeoLocation from "../hooks/useGeoLocation";
import Button from "./Button";

function Map() {
  const { cities } = useCities();
  const [lat, lng] = useUrlpostion();
  const {
    position: geoPostion,
    isLoading: geoIsLoading,
    getGeoPosition,
  } = useGeoLocation();
  const [mapPostion, setMapPostion] = useState([40, 0]);

  useEffect(() => {
    if (lat && lng) setMapPostion([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPostion) setMapPostion([geoPostion.lat, geoPostion.lng]);
  }, [geoPostion]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getGeoPosition}>
        {geoIsLoading ? "Loading" : "Use Your Position"}
      </Button>

      <MapContainer
        className={styles.map}
        center={mapPostion}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span> {city.cityName}
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPostion} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}

export default Map;
