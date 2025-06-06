import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import FilmeLista from './FilmeLista'
import FilmeForm from './FilmeForm'

const Stack = createStackNavigator()

export default function FilmeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FilmeLista"
        component={FilmeLista}
        options={{ title: 'Filmes', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="FilmeForm"
        component={FilmeForm}
        options={{ title: 'Cadastro de Filme', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  )
}
