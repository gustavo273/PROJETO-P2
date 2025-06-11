import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, Card, Text, FAB, Divider, Chip } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import AnimeService from "./AnimeService"; // Atualize conforme a estrutura do seu projeto

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
      "Tem certeza que deseja excluir este anime?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => removerAnime(id) },
      ]
    );
  }

  const renderCard = (item) => (
    <Card style={styles.card} key={item.id} elevation={5}>
      <View style={styles.row}>
        {item.imagemUrl && (
          <View style={styles.imageContainer}>
            <Card.Cover source={{ uri: item.imagemUrl }} style={styles.image} />
          </View>
        )}
        <View style={styles.infoContainer}>
          <Card.Title title={item.titulo} titleStyle={{ fontWeight: "bold", color: "white" }} />
          <Card.Content>
            <Text style={{ color: "white" }}>Gênero: {item.genero}</Text>
            <Divider style={{ marginVertical: 11, backgroundColor: "white" }} />
            <Text style={{ color: "white" }}>Duração: {item.duração}</Text>
            <Divider style={{ marginVertical: 11, backgroundColor: "white" }} />
            <Text style={{ color: "white" }}>Lançamento: {item.dataLancamento}</Text>
            <Divider style={{ marginVertical: 11, backgroundColor: "" }} />
            <Text style={{ color: "white" }}>Classificação:</Text>
            <Chip
              icon="star"
              style={{ marginTop: 6, backgroundColor: "black" }}
              textStyle={{ color: "white" }}
            >
              {item.classificacao}
            </Chip>
          </Card.Content>
        </View>
      </View>
      <Card.Actions style={styles.actions}>
        <Button icon="pencil" onPress={() => navigation.navigate("AnimeForm", item)} />
        <Button icon="delete" onPress={() => confirmarRemocao(item.id)} buttonColor="red" />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {animes.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 40, color: "white" }}>
          Nenhum anime cadastrado
        </Text>
      )}

      {animes.length === 1 && (
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {renderCard(animes[0])}
        </ScrollView>
      )}

      {animes.length > 1 && (
        <Carousel
          loop
          width={screenWidth}
          height={screenWidth * 1.2}
          autoPlay={true}
          autoPlayInterval={3000}
          data={animes}
          scrollAnimationDuration={500}
          renderItem={({ index }) => renderCard(animes[index])}
          mode="parallax"
        />
      )}

      <View style={{ alignItems: 'center', marginTop: 16 }}>
        <FAB
          icon="plus"
          label="Cadastrar"
          style={styles.fab}
          onPress={() => navigation.navigate("AnimeForm")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    backgroundColor: "grey"
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    width: screenWidth * 0.95,
    marginVertical: 16,
    backgroundColor: "#121212",
    elevation: 6,
    alignSelf: "center",
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    padding: 12,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    padding: 4,
  },
  image: {
    width: 140,
    height: 200,
    borderRadius: 12,
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1.5,
    paddingLeft: 12,
    justifyContent: "center",
  },
  actions: {
    justifyContent: "flex-end",
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  fab: {
    margin: 16,
    right: 0,
    bottom: 35,
    backgroundColor: "",
    bottom: 50
  },
});
