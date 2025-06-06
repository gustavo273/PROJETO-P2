import React, { useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { Button, Card, Text, FAB, Divider, Chip } from 'react-native-paper'
import Carousel from 'react-native-reanimated-carousel'
import FilmeService from './FilmeService'

const { width: screenWidth } = Dimensions.get('window')

export default function FilmeLista({ navigation }) {
  const [filmes, setFilmes] = useState([])

  useEffect(() => {
    buscarFilmes()
  }, [])

  async function buscarFilmes() {
    const lista = await FilmeService.listar()
    setFilmes(lista)
  }

  async function removerFilme(id) {
    await FilmeService.remover(id)
    alert('Filme excluído com sucesso!')
    buscarFilmes()
  }

  const renderCard = (item) => (
    <Card style={styles.card} key={item.id} elevation={5}>
      {item.imagemUrl ? (
        <Card.Cover source={{ uri: item.imagemUrl }} style={styles.image} />
      ) : null}
      <Card.Title title={item.titulo} />
      <Card.Content>
        <Text>Gênero:{item.genero}</Text>
        <Divider style={{ marginVertical: 8 }} />
        <Text>Duração: {item.duracao} min</Text>
        <Divider style={{ marginVertical: 8 }} />
        <Text>Lançamento: {item.dataLancamento}</Text>
        <Divider style={{ marginVertical: 8 }} />
        <Text>Classificação:</Text>
        <Chip icon="star" style={{ marginTop: 10 }}>
          {item.classificacao}
        </Chip>
      </Card.Content>
      <Card.Actions>
        <Button icon="pencil" onPress={() => navigation.navigate('FilmeForm', item)} />
        <Button icon="delete" onPress={() => removerFilme(item.id)} />
      </Card.Actions>
    </Card>
  )

  return (
    <View style={styles.container}>


      {filmes.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 40 }}>Nenhum filme cadastrado</Text>
      )}

      {filmes.length === 1 && (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderCard(filmes[0])}
        </ScrollView>
      )}

      {filmes.length > 1 && (
        <Carousel
          loop
          width={screenWidth}
          height={screenWidth * 1.2}
          autoPlay={false}
          data={filmes}
          scrollAnimationDuration={500}
          renderItem={({ index }) => renderCard(filmes[index])}
          mode="parallax"
        />

      )}
      <FAB
        icon="plus"
        label="Cadastrar"
        style={styles.fab}
        onPress={() => navigation.navigate('FilmeForm')}
      />

    </View>

  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'grey', // fundo claro e neutro
  },
  card: {
  borderRadius: 15,
  overflow: 'hidden',
  width: screenWidth * 0.9,
  marginVertical: 12,
  backgroundColor: 'white',
  elevation: 6,
  alignSelf: 'center', // <- Isso centraliza o card
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 35,
  },
})
