import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput, PaperProvider, DefaultTheme } from 'react-native-paper'
import FilmeService from './FilmeService'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    onSurfaceVariant: 'white',
    onSurface: 'white',
    outline: 'white',
  },
};

export default function FilmeForm({ navigation, route }) {
  const filmeAntigo = route.params || {}

  const [titulo, setTitulo] = useState(filmeAntigo.titulo || '')
  const [genero, setGenero] = useState(filmeAntigo.genero || '')
  const [duracao, setDuracao] = useState(filmeAntigo.duracao || '')
  const [dataLancamento, setDataLancamento] = useState(filmeAntigo.dataLancamento || '')
  const [classificacao, setClassificacao] = useState(filmeAntigo.classificacao || '')
  const [trailerUrl, setTrailerUrl] = useState(filmeAntigo.trailerUrl || '')
  const [errors, setErrors] = useState({})

  function validar() {
    const novoErros = {}

    if (!titulo.trim()) novoErros.titulo = 'Título é obrigatório'
    if (!genero.trim()) novoErros.genero = 'Gênero é obrigatório'

    if (!duracao || isNaN(duracao) || parseInt(duracao) <= 0)
      novoErros.duracao = 'Duração inválida'

    const ano = parseInt(dataLancamento)
    if (!dataLancamento || isNaN(ano) || ano < 1900 || ano > new Date().getFullYear())
      novoErros.dataLancamento = 'Ano inválido'

    if (!classificacao.trim()) novoErros.classificacao = 'Classificação é obrigatória'
    if (!trailerUrl.trim()) novoErros.trailerUrl = 'URL do trailer é obrigatória'

    setErrors(novoErros)
    return Object.keys(novoErros).length === 0
  }

  async function salvar() {
    if (!validar()) return

    const filme = {
      titulo,
      genero,
      duracao,
      dataLancamento,
      classificacao,
      trailerUrl
    }

    if (filmeAntigo.id) {
      filme.id = filmeAntigo.id
      await FilmeService.atualizar(filme)
      alert('Filme atualizado com sucesso!')
    } else {
      await FilmeService.salvar(filme)
      alert('Filme cadastrado com sucesso!')
    }

    navigation.reset({ index: 0, routes: [{ name: 'FilmeLista' }] })
  }

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <Text variant="headlineMedium" style={[styles.title, { fontWeight: 'bold' }]}>Cadastro</Text>

        <TextInput
          label="Título"
          mode="outlined"
          value={titulo}
          onChangeText={setTitulo}
          style={styles.input}
          theme={{ roundness: 25 }}
          error={!!errors.titulo} />

        {errors.titulo && <Text style={styles.errorText}>{errors.titulo}</Text>}

        <TextInput
          label="Gênero"
          mode="outlined"
          value={genero}
          onChangeText={setGenero}
          style={styles.input}
          theme={{ roundness: 25 }}
          error={!!errors.genero} />

        {errors.genero && <Text style={styles.errorText}>{errors.genero}</Text>}

        <TextInput
          label="Duração (min)"
          mode="outlined"
          value={duracao.toString()}
          onChangeText={setDuracao}
          keyboardType="numeric"
          style={styles.input}
          theme={{ roundness: 25 }}
          error={!!errors.duracao} />

        {errors.duracao && <Text style={styles.errorText}>{errors.duracao}</Text>}

        <TextInput
          label="Ano de Lançamento"
          mode="outlined"
          value={dataLancamento}
          onChangeText={setDataLancamento}
          keyboardType="numeric"
          style={styles.input}
          theme={{ roundness: 25 }}
          error={!!errors.dataLancamento}
          render={props => (
            <TextInputMask {...props} type={'datetime'} options={{ format: 'YYYY' }} />
          )} />

        {errors.dataLancamento && <Text style={styles.errorText}>{errors.dataLancamento}</Text>}

        <TextInput
          label="Classificação"
          mode="outlined"
          value={classificacao}
          onChangeText={setClassificacao}
          style={styles.input}
          theme={{ roundness: 25 }}
          error={!!errors.classificacao} />

        {errors.classificacao && <Text style={styles.errorText}>{errors.classificacao}</Text>}

        <TextInput
          label="URL do Trailer (YouTube)"
          mode="outlined" value={trailerUrl}
          onChangeText={setTrailerUrl}
          style={styles.input}
          theme={{ roundness: 25 }}
          error={!!errors.trailerUrl} />

        {errors.trailerUrl && <Text style={styles.errorText}>{errors.trailerUrl}</Text>}

        <Button mode="contained" onPress={salvar} style={styles.button} buttonColor="green">Salvar Filme</Button>
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
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: -5,
    marginBottom: 8,
    marginLeft: 4
  }
})
