import { useState } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import { Button, Text, TextInput } from 'react-native-paper'
import FilmeService from './FilmeService'

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Cadastro de Filme</Text>

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
        Salvar Filme
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor:''
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
