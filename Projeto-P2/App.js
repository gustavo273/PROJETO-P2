import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import StackRoutes from './src/routes/StackRoutes';

export default function App() {
  return (
    <View >
      <PaperProvider>
        <StackRoutes/>
      </PaperProvider>
    </View>
  );
}


