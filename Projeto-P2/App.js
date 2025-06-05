import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import FilmeStack from './src/Filmes/FilmeStack';
import SerieStack from "./src/Series/SerieStack.jsx";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnimeStack from "./src/Anime/AnimeStack.jsx";

const Tab = createBottomTabNavigator();


export default function App () {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName = route.name === 'Filmes' ? 'movie-open' : 'television-classic';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          headerShown: false
        })}
      >
        <Tab.Screen name="Filmes" component={FilmeStack} />
        <Tab.Screen name="Séries" component={SerieStack} />
        <Tab.Screen name="Animes" component={AnimeStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

