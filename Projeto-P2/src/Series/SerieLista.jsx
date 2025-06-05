import React, { useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import Carousel from 'react-native-reanimated-carousel'
import SerieService from './SerieService'

const { width: screenWidth } = Dimensions.get('window')

export default function SerieLista({ navigation }) {
  const [series, setSeries] = useState([])

  useEffect(() => {
    buscarSeries()
  }, [])

  async function buscarSeries() {
    const lista = await SerieService.listar()
    setSeries(lista)
  }

  async function removerSerie(id) {
    await SerieService.remover(id)
    alert('Série excluída com sucesso!')
    buscarSeries()
  }

  const renderCard = (item) => (
    <Card style={styles.card} key={item.id} elevation={5}>
      {item.imagemUrl ? (
        <Card.Cover source={{ uri: item.imagemUrl }} style={styles.image} />
      ) : null}
      <Card.Title title={item.titulo} subtitle={item.genero} />
      <Card.Content>
        <Text>Temporadas: {item.temporadas}</Text>
        <Text>Episódios: {item.episodios}</Text>
        <Text>Estreia: {item.dataEstreia}</Text>
      </Card.Content>
      <Card.Actions>
        <Button icon="pencil" onPress={() => navigation.navigate('SerieForm', item)} />
        <Button icon="delete" onPress={() => removerSerie(item.id)} />
      </Card.Actions>
    </Card>
  )

  return (
    <View style={styles.container}>
      <Button
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate('SerieForm')}
        style={styles.botaoCadastrar}
      >
        Cadastrar Série
      </Button>

      {series.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 40 }}>Nenhuma série cadastrada</Text>
      )}

      {series.length === 1 && (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderCard(series[0])}
        </ScrollView>
      )}

      {series.length > 1 && (
        <Carousel
          loop
          width={screenWidth}
          height={screenWidth * 1.2}
          autoPlay={false}
          data={series}
          scrollAnimationDuration={500}
          renderItem={({ index }) => renderCard(series[index])}
          mode="parallax"
        />
      )}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f9f9f9', // fundo claro e neutro
  },
  card: {
    borderRadius: 15,
    overflow: 'hidden',
    width: screenWidth * 0.9,
    marginVertical: 12,
    backgroundColor: 'white',
    elevation: 6, // sombra suave para destaque
  },
  image: {
    height: screenWidth * 0.55,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  subtitle: {
    color: '#777',
    fontSize: 14,
    marginBottom: 8,
  },
  contentText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#444',
  },
  actions: {
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  button: {
    marginHorizontal: 8,
  },
  btnAdd: {
    marginBottom: 20,
    marginHorizontal: 20,
  },
})