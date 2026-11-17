import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { getAddress } from "../../utils/location";

function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();

  const navigation = useNavigation();
  const route = useRoute();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    async function handleRouteParamsLocation() {
      if (isFocused && route.params) {
        const mapPickedLocation = {
          lat: route.params.pickedLocation.lat,
          lng: route.params.pickedLocation.lng,
        };
        setPickedLocation(mapPickedLocation);
      }
    }

    handleRouteParamsLocation();
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng,
        );

        onPickLocation({ ...pickedLocation, address });
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to use this app.",
      );

      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location chosen yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <MapView
        style={styles.map}
        region={{
          latitude: pickedLocation.lat,
          longitude: pickedLocation.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.01,
        }}
        pointerEvents="none"
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        liteMode
      >
        <Marker
          coordinate={{
            latitude: pickedLocation.lat,
            longitude: pickedLocation.lng,
          }}
        />
      </MapView>
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate me
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
