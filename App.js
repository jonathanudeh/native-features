import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={{
              headerRight: ({ tintColor }) => (
                <IconButton icon="add" color={tintColor} size={26} />
              ),
            }}
          />
          <Stack.Screen name="AddPlaces" component={AddPlace} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
