import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput, PaperProvider, DefaultTheme } from 'react-native-paper'
import AnimeService from './AnimeService'

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

export default function AnimeForm({ navigation, route }) {
  const animeAntigo = route.params || {}

  const [titulo, setTitulo] = useState(animeAntigo.titulo || '')
  const [genero, setGenero] = useState(animeAntigo.genero || '')
  const [duracao, setDuracao] = useState(animeAntigo.duracao || '')
  const [dataLancamento, setDataLancamento] = useState(animeAntigo.dataLancamento || '')
  const [classificacao, setClassificacao] = useState(animeAntigo.classificacao || '')
  const [imagemUrl, setImagemUrl] = useState(animeAntigo.imagemUrl || '')
  const [errors, setErrors] = useState({})

  function validar() {
    const novoErros = {}

    if (!titulo.trim()) novoErros.titulo = 'Título é obrigatório'
    if (!genero.trim()) novoErros.genero = 'Gênero é obrigatório'

    if (!duracao) {
      novoErros.duracao = 'Duração é obrigatória'
    } else if (isNaN(duracao) || parseInt(duracao) <= 0) {
      novoErros.duracao = 'Valor inválido'
    }

    if (!dataLancamento) {
      novoErros.dataLancamento = 'Ano de lançamento é obrigatório'
    } else if (
      isNaN(dataLancamento) ||
      parseInt(dataLancamento) < 1900 ||
      parseInt(dataLancamento) > new Date().getFullYear()
    ) {
      novoErros.dataLancamento = 'Ano inválido'
    }

    if (!classificacao.trim()) novoErros.classificacao = 'Classificação é obrigatória'
    if (!imagemUrl.trim()) novoErros.imagemUrl = 'URL da imagem é obrigatória'

    setErrors(novoErros)

    return Object.keys(novoErros).length === 0
  }

  async function salvar() {
    if (!validar()) return

    const anime = {
      titulo,
      genero,
      duracao,
      dataLancamento,
      classificacao,
      imagemUrl
    }

    if (animeAntigo.id) {
      anime.id = animeAntigo.id
      await AnimeService.atualizar(anime)
      alert('Anime atualizado com sucesso!')
    } else {
      await AnimeService.salvar(anime)
      alert('Anime cadastrado com sucesso!')
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'AnimeLista' }]
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
          error={!!errors.titulo}
        />
        {errors.titulo && <Text style={styles.errorText}>{errors.titulo}</Text>}

        <TextInput
          label="Gênero"
          mode="outlined"
          value={genero}
          onChangeText={setGenero}
          style={styles.input}
          theme={{ roundness: 25 }}
          error={!!errors.genero}
        />
        {errors.genero && <Text style={styles.errorText}>{errors.genero}</Text>}

        <TextInput
          label="Duração (min)"
          mode="outlined"
          value={duracao.toString()}
          onChangeText={setDuracao}
          keyboardType="numeric"
          style={styles.input}
          theme={{ roundness: 25 }}
          error={!!errors.duracao}
        />
        {errors.duracao && <Text style={styles.errorText}>{errors.duracao}</Text>}

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
          error={!!errors.dataLancamento}
        />
        {errors.dataLancamento && <Text style={styles.errorText}>{errors.dataLancamento}</Text>}

        <TextInput
          label="Classificação Indicativa"
          mode="outlined"
          value={classificacao}
          onChangeText={setClassificacao}
          style={styles.input}
          theme={{ roundness: 25 }}
          error={!!errors.classificacao}
        />
        {errors.classificacao && <Text style={styles.errorText}>{errors.classificacao}</Text>}

        <TextInput
          label="Imagem (URL da capa)"
          mode="outlined"
          value={imagemUrl}
          onChangeText={setImagemUrl}
          style={styles.input}
          theme={{ roundness: 25 }}
          error={!!errors.imagemUrl}
        />
        {errors.imagemUrl && <Text style={styles.errorText}>{errors.imagemUrl}</Text>}

        <Button mode="contained" onPress={salvar} style={styles.button} buttonColor="green">
          Salvar Anime
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
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: -5,
    marginBottom: 8,
    marginLeft: 4
  }
})
