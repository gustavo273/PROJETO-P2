import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@animes';

async function listar() {
  const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(anime) {
  anime.id = new Date().getTime();
  const animes = await listar();
  animes.push(anime);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(animes));
}

async function buscar(id) {
  const animes = await listar();
  return animes.find(anime => anime.id === id);
}

async function remover(id) {
  const animes = await listar();
  const novaLista = animes.filter(anime => anime.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

async function atualizar(novoAnime) {
  const animes = await listar();
  const novaLista = animes.map(anime => anime.id === novoAnime.id ? novoAnime : anime);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  buscar,
  atualizar,
  remover
};
