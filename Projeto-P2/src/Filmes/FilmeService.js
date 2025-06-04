import AsyncStorage from '@react-native-async-storage/async-storage';

async function listar() {
  const jsonValue = await AsyncStorage.getItem('@filmes');
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(filme) {
  filme.id = new Date().getTime();
  const filmes = await listar();
  filmes.push(filme);
  await AsyncStorage.setItem('@filmes', JSON.stringify(filmes));
}

async function buscar(id) {
  const filmes = await listar();
  return filmes.find(filme => filme.id === id);
}

async function remover(id) {
  const filmes = await listar();
  const novaLista = filmes.filter(filme => filme.id !== id);
  await AsyncStorage.setItem('@filmes', JSON.stringify(novaLista));
}

async function atualizar(novoFilme) {
  const filmes = await listar();
  const novaLista = filmes.map(filme => filme.id === novoFilme.id ? novoFilme : filme);
  await AsyncStorage.setItem('@filmes', JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  buscar,
  atualizar,
  remover
}
