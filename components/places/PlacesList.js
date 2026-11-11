import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No Places added yet - Start adding some
        </Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={places}
        renderItem={({ item }) => {
          return <PlaceItem place={item} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});
