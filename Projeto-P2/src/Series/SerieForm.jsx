import { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import SerieService from './SerieService'

export default function SerieForm({ navigation, route }) {
  const serieAntiga = route.params || {}

  const [titulo, setTitulo] = useState(serieAntiga.titulo || '')
  const [genero, setGenero] = useState(serieAntiga.genero || '')
  const [temporadas, setTemporadas] = useState(serieAntiga.temporadas || '')
  const [episodios, setEpisodios] = useState(serieAntiga.episodios || '')
  const [dataEstreia, setDataEstreia] = useState(serieAntiga.dataEstreia || '')
  const [classificacao, setClassificacao] = useState(serieAntiga.classificacao || '')
  const [imagemUrl, setImagemUrl] = useState(serieAntiga.imagemUrl || '')

  async function salvar() {
    if (!titulo || !genero || !temporadas || !episodios || !dataEstreia || !classificacao || !imagemUrl) {
      alert('Preencha todos os campos!')
      return
    }

    const serie = {
      titulo,
      genero,
      temporadas,
      episodios,
      dataEstreia,
      classificacao,
      imagemUrl
    }

    if (serieAntiga.id) {
      serie.id = serieAntiga.id
      await SerieService.atualizar(serie)
      alert('Série atualizada com sucesso!')
    } else {
      await SerieService.salvar(serie)
      alert('Série cadastrada com sucesso!')
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'SerieLista' }]
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Cadastro de Série</Text>

      <TextInput
        label="Título"
        mode="outlined"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
        theme={{ roundness: 25 }}
      />

      <TextInput
        label="Gênero"
        mode="outlined"
        value={genero}
        onChangeText={setGenero}
        style={styles.input}
        theme={{ roundness: 25 }}
      />

      <TextInput
        label="Temporadas"
        mode="outlined"
        value={temporadas.toString()}
        onChangeText={setTemporadas}
        keyboardType="numeric"
        style={styles.input}
        theme={{ roundness: 25 }}
      />

      <TextInput
        label="Episódios"
        mode="outlined"
        value={episodios.toString()}
        onChangeText={setEpisodios}
        keyboardType="numeric"
        style={styles.input}
        theme={{ roundness: 25 }}
      />

      <TextInput
        label="Data de Estreia"
        mode="outlined"
        value={dataEstreia}
        onChangeText={setDataEstreia}
        keyboardType="numeric"
        render={props => (
          <TextInputMask
            {...props}
            type={'datetime'}
            options={{ format: 'DD/MM/YYYY' }}
          />
        )}
        style={styles.input}
        theme={{ roundness: 25 }}
      />
      <TextInput
        label="Classificação Indicativa"
        mode="outlined"
        value={classificacao}
        onChangeText={setClassificacao}
        style={styles.input}
        theme={{ roundness: 25 }}
      />

      <TextInput
        label="Imagem (URL da capa)"
        mode="outlined"
        value={imagemUrl}
        onChangeText={setImagemUrl}
        style={styles.input}
        theme={{ roundness: 25 }}
      />

      <Button mode="contained" onPress={salvar} style={styles.button} buttonColor="green">
        Salvar Série
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center'
  },
  title: {
    marginBottom: 10
  },
  input: {
    width: '100%',
    marginVertical: 8
  },
  button: {
    width: '100%',
    marginTop: 16
  }
})
