import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput, PaperProvider, DefaultTheme  } from 'react-native-paper'
import FilmeService from './FilmeService'


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

export default function FilmeForm({ navigation, route }) {
  const filmeAntigo = route.params || {}

  const [titulo, setTitulo] = useState(filmeAntigo.titulo || '')
  const [genero, setGenero] = useState(filmeAntigo.genero || '')
  const [duracao, setDuracao] = useState(filmeAntigo.duracao || '')
  const [dataLancamento, setDataLancamento] = useState(filmeAntigo.dataLancamento || '')
  const [classificacao, setClassificacao] = useState(filmeAntigo.classificacao || '')
  const [imagemUrl, setImagemUrl] = useState(filmeAntigo.imagemUrl || '')

  async function salvar() {
    if (!titulo || !genero || !duracao || !dataLancamento || !classificacao || !imagemUrl) {
      alert('Preencha todos os campos!')
      return
    }

    const filme = {
      titulo,
      genero,
      duracao,
      dataLancamento,
      classificacao,
      imagemUrl
    }

    if (filmeAntigo.id) {
      filme.id = filmeAntigo.id
      await FilmeService.atualizar(filme)
      alert('Filme atualizado com sucesso!')
    } else {
      await FilmeService.salvar(filme)
      alert('Filme cadastrado com sucesso!')
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'FilmeLista' }]
    })
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={[styles.title, { fontWeight: 'bold' }]}>{"Cadastro".toUpperCase()}</Text>

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
          label="Duração (min)"
          mode="outlined"
          value={duracao.toString()}
          onChangeText={setDuracao}
          keyboardType="numeric"
          style={styles.input}
          theme={{ roundness: 25 }}
        />

        <TextInput
          label="Ano de Lançamento"
          mode="outlined"
          value={dataLancamento}
          onChangeText={setDataLancamento}
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
          Salvar Filme
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
    backgroundColor: 'grey'
  },
  title: {
    marginBottom: 10,
    color: "white"
  },
  input: {
    width: '100%',
    marginVertical: 8,
    backgroundColor: "black"
  },
  button: {
    width: '100%',
    marginTop: 16
  }
})