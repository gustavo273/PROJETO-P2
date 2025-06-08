import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import AnimeLista from './AnimeLista'
import AnimeForm from './AnimeForm'

const Stack = createStackNavigator()

export default function AnimeStack() {
  return (
    <Stack.Navigator  screenOptions={{
      headerStyle: {
        backgroundColor: 'black', 
      },
      headerTintColor: 'white', 
      headerTitleAlign: 'center',
    }}
  >
      <Stack.Screen
        name="AnimeLista"
        component={AnimeLista}
        options={{ title: 'ANIMES', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="AnimeForm"
        component={AnimeForm}
        options={{ title: 'Cadastro de Anime', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  )
}
