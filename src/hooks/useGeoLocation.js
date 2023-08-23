import { useState } from "react";

function useGeoLocation(defaultPosition = null) {
  const [position, setPostion] = useState(defaultPosition);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function getGeoPosition() {
    if (!navigator.geolocation)
      return setError("Your Browser doesn't support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPostion({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { position, isLoading, error, getGeoPosition };
}

export default useGeoLocation;
