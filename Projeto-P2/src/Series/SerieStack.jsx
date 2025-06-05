import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SerieLista from './SerieLista'
import SerieForm from './SerieForm'

const Stack = createStackNavigator()

export default function SerieStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SerieLista"
        component={SerieLista}
        options={{ title: 'Séries', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name="SerieForm"
        component={SerieForm}
        options={{ title: 'Cadastro de Série', headerTitleAlign: 'center' }}
      />
    </Stack.Navigator>
  )
}
