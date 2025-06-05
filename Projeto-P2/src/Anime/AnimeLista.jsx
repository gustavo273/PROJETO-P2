import React, { useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Button, Card, Text } from 'react-native-paper'
import Carousel from 'react-native-reanimated-carousel'
import AnimeService from './AnimeService'

const { width: screenWidth } = Dimensions.get('window')

export default function AnimeLista({ navigation }) {
  const [animes, setAnimes] = useState([])

  useEffect(() => {
    buscarAnimes()
  }, [])

  async function buscarAnimes() {
    const lista = await AnimeService.listar()
    setAnimes(lista)
  }

  async function removerAnime(id) {
    await AnimeService.remover(id)
    alert('Anime excluído com sucesso!')
    buscarAnimes()
  }

  const renderCard = (item) => (
    <Card style={styles.card} key={item.id} elevation={5}>
      {item.imagemUrl ? (
        <Card.Cover source={{ uri: item.imagemUrl }} style={styles.image} />
      ) : null}
      <Card.Title title={item.titulo} subtitle={item.genero} />
      <Card.Content>
        <Text>Duração: {item.duracao} min</Text>
        <Text>Lançamento: {item.dataLancamento}</Text>
        <Text>Classificação: {item.classificacao}</Text>
      </Card.Content>
      <Card.Actions>
        <Button icon="pencil" onPress={() => navigation.navigate('AnimeForm', item)} />
        <Button icon="delete" onPress={() => removerAnime(item.id)} />
      </Card.Actions>
    </Card>
  )

  return (
    <View style={styles.container}>
      <Button
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate('AnimeForm')}
        style={styles.botaoCadastrar}
      >
        Cadastrar Anime
      </Button>

      {animes.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 40 }}>Nenhum anime cadastrado</Text>
      )}

      {animes.length === 1 && (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderCard(animes[0])}
        </ScrollView>
      )}

      {animes.length > 1 && (
        <Carousel
          loop
          width={screenWidth}
          height={screenWidth * 1.2}
          autoPlay={false}
          data={animes}
          scrollAnimationDuration={500}
          renderItem={({ index }) => renderCard(animes[index])}
          mode="parallax"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  botaoCadastrar: {
    marginBottom: 20,
    alignSelf: 'center',
    width: '90%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    width: screenWidth * 0.85,
    elevation: 5,
    backgroundColor: '#f0f0f0'
  },
  image: {
    height: screenWidth * 0.5,
  },
})
