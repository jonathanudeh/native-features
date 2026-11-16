import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function getPlaces() {
      if (isFocused && route.params) {
        setLoadedPlaces((currPlaces) => [...currPlaces, route.params.place]);
      }
    }

    getPlaces();
  }, [isFocused, route.params]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
