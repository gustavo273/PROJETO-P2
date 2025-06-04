import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-paper'

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Tela de Login</Text>
      {/* Seu formulário de login aqui */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Filmes')}
        style={{ marginTop: 20 }}
      >
        Entrar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
