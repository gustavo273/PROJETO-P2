import { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import AnimeService from './AnimeService'

export default function AnimeForm({ navigation, route }) {
  const animeAntigo = route.params || {}

  const [titulo, setTitulo] = useState(animeAntigo.titulo || '')
  const [genero, setGenero] = useState(animeAntigo.genero || '')
  const [duracao, setDuracao] = useState(animeAntigo.duracao || '')
  const [dataLancamento, setDataLancamento] = useState(animeAntigo.dataLancamento || '')
  const [classificacao, setClassificacao] = useState(animeAntigo.classificacao || '')
  const [imagemUrl, setImagemUrl] = useState(animeAntigo.imagemUrl || '')

  async function salvar() {
    if (!titulo || !genero || !duracao || !dataLancamento || !classificacao || !imagemUrl) {
      alert('Preencha todos os campos!')
      return
    }

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Cadastro de Anime</Text>

      <TextInput
        label="Título"
        mode="outlined"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
      />

      <TextInput
        label="Gênero"
        mode="outlined"
        value={genero}
        onChangeText={setGenero}
        style={styles.input}
      />

      <TextInput
        label="Duração (min)"
        mode="outlined"
        value={duracao.toString()}
        onChangeText={setDuracao}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        label="Data de Lançamento"
        mode="outlined"
        value={dataLancamento}
        onChangeText={setDataLancamento}
        keyboardType="numeric"
        render={props => (
          <TextInputMask
            {...props}
            type={'datetime'}
            options={{ format: 'DD/MM/YYYY' }}
          />
        )}
        style={styles.input}
      />

      <TextInput
        label="Classificação Indicativa"
        mode="outlined"
        value={classificacao}
        onChangeText={setClassificacao}
        style={styles.input}
      />

      <TextInput
        label="Imagem (URL da capa)"
        mode="outlined"
        value={imagemUrl}
        onChangeText={setImagemUrl}
        style={styles.input}
      />

      <Button mode="contained" onPress={salvar} style={styles.button}>
        Salvar Anime
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
