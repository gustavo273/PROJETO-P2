import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput, PaperProvider, DefaultTheme } from 'react-native-paper'
import SerieService from './SerieService'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    onSurfaceVariant: 'white',
    onSurface: 'white',
    outline: 'white',
    surfaceVariant: 'black',
    onSurfaceDisabled: 'gray'
  },
};

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
    <PaperProvider theme={theme}>
      <View style={styles.container}>
      <Text variant="headlineMedium" style={[styles.title, { fontWeight: 'bold' }]}>{"CADASTRO".toUpperCase()}</Text>

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
          label="Ano de Lançamento"
          mode="outlined"
          value={dataEstreia}
          onChangeText={setDataEstreia}
          keyboardType="numeric"
          render={props => (
            <TextInputMask
              {...props}
              type={'datetime'}
              options={{ format: 'YYYY' }}
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
      </View>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor:'grey'
  },
  title: {
    marginBottom: 10,
    color: "white"
  },
  input: {
    width: '100%',
    marginVertical: 8,
    backgroundColor:"black"
  },
  button: {
    width: '100%',
    marginTop: 16
  }
})