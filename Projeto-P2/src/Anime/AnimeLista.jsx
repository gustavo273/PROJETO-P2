import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, Card, Text, FAB, Divider, Chip } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import AnimeService from "./AnimeService";

const { width: screenWidth } = Dimensions.get("window");

export default function AnimeLista({ navigation }) {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    buscarAnimes();
  }, []);

  async function buscarAnimes() {
    const lista = await AnimeService.listar();
    setAnimes(lista);
  }

  async function removerAnime(id) {
    await AnimeService.remover(id);
    alert("Anime excluído com sucesso!");
    buscarAnimes();
  }
  function confirmarRemocao(id) {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este filme?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => removerFilme(id),
        },
      ]
    );
  }

  const renderCard = (item) => (
    <Card style={styles.card} key={item.id} elevation={5}>
      {item.imagemUrl && (
        <Card.Cover source={{ uri: item.imagemUrl }} style={styles.image} />
      )}
      <Card.Title title={item.titulo} titleStyle={{ fontWeight: "bold" }} />

      <Card.Content>
        <Text>Gênero: {item.genero}</Text>
        <Divider style={{ marginVertical: 8 }} />
        <Text>Episódios: {item.episodios}</Text>
        <Divider style={{ marginVertical: 8 }} />
        <Text>Lançamento: {item.dataLancamento}</Text>
        <Divider style={{ marginVertical: 8 }} />
        <Text>Classificação:</Text>
        <Chip icon="star" style={{ marginTop: 10 }}>
          {item.classificacao}
        </Chip>
      </Card.Content>
      <Card.Actions>
        <Button
          icon="pencil"
          onPress={() => navigation.navigate("AnimeForm", item)}
        />
        <Button icon="delete" onPress={() => confirmarRemocao(item.id)} />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {animes.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Nenhum anime cadastrado
        </Text>
      )}

      {animes.length === 1 && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {renderCard(animes[0])}
        </ScrollView>
      )}

      {animes.length > 1 && (
        <Carousel
          loop
          width={screenWidth}
          height={screenWidth * 1.2}
          data={animes}
          scrollAnimationDuration={500}
          renderItem={({ index }) => renderCard(animes[index])}
          mode="parallax"
        />
      )}

      <FAB
        icon="plus"
        label="Cadastrar"
        style={styles.fab}
        onPress={() => navigation.navigate("AnimeForm")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "grey",
  },
  card: {
    borderRadius: 15,
    overflow: "hidden",
    width: screenWidth * 0.9,
    marginVertical: 12,
    backgroundColor: "white",
    elevation: 6,
    alignSelf: "center",
  },
  image: {
    height: screenWidth * 0.55,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 35,
  },
});
