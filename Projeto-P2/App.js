import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import FilmeStack from './src/Filmes/FilmeStack';
import { createDrawerNavigator } from '@react-navigation/drawer'

import LoginScreen from './src/screens/LoginScreen.jsx'

const Drawer = createDrawerNavigator()

export default function App() {
  return (

    <PaperProvider>
      <NavigationContainer>
        <FilmeStack />
      </NavigationContainer>
        
    </PaperProvider>

  );
}


