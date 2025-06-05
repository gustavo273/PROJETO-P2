import AsyncStorage from '@react-native-async-storage/async-storage';

async function listar() {
  const jsonValue = await AsyncStorage.getItem('@series');
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}

async function salvar(serie) {
  serie.id = new Date().getTime();
  const series = await listar();
  series.push(serie);
  await AsyncStorage.setItem('@series', JSON.stringify(series));
}

async function buscar(id) {
  const series = await listar();
  return series.find(serie => serie.id === id);
}

async function remover(id) {
  const series = await listar();
  const novaLista = series.filter(serie => serie.id !== id);
  await AsyncStorage.setItem('@series', JSON.stringify(novaLista));
}

async function atualizar(novaSerie) {
  const series = await listar();
  const novaLista = series.map(serie => serie.id === novaSerie.id ? novaSerie : serie);
  await AsyncStorage.setItem('@series', JSON.stringify(novaLista));
}

export default {
  listar,
  salvar,
  buscar,
  atualizar,
  remover
}
