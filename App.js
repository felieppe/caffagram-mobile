import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import Home from "./pages/Home";
import User from "./pages/User";
import Login from "./pages/Login";

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ title: "Home" }}
                    />
                    <Stack.Screen
                        name="User"
                        component={User}
                        options={{ title: "User Profile" }}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ title: "Login" }}
                    />
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

export default App;
