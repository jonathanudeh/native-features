import { reverseGeocodeAsync } from "expo-location";

export function getMapPreview(lat, lng) {
  const imagePreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;

  return imagePreview;
}

export async function getAddress(lat, lng) {
  const [place] = await reverseGeocodeAsync({ latitude: lat, longitude: lng });

  if (!place) {
    throw new Error("Could not find an address for this location.");
  }

  // Android gives a ready-made string; iOS doesn't, so build one.
  if (place.formattedAddress) {
    return place.formattedAddress;
  }

  return [
    [place.streetNumber, place.street].filter(Boolean).join(" "),
    place.city,
    place.region,
    place.postalCode,
    place.country,
  ]
    .filter(Boolean)
    .join(", ");
}
