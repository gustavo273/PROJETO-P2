import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, Card, Text, FAB, Divider, Chip } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import AnimeService from "./AnimeService";
import { WebView } from "react-native-webview";

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
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => removerAnime(id),
        },
      ]
    );
  }

  function extrairVideoId(url) {
    if (!url || typeof url !== "string") return null;
    const match = url.match(/(?:\?v=|\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  }

  const renderCard = (item) => {
    const videoId = extrairVideoId(item.trailerUrl);
    return (
      <Card style={styles.card} key={item.id} elevation={5}>
        <View style={styles.row}>
          {videoId && (
            <View style={styles.videoContainer}>
              <WebView
                style={styles.video}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
              />
            </View>
          )}
          <View style={styles.infoContainer}>
            <Card.Title
              title={item.titulo}
              titleStyle={{ fontWeight: "bold", color: "white" }}
            />
            <Card.Content>
              <Text style={{ color: "white" }}>Gênero: {item.genero}</Text>
              <Divider
                style={{ marginVertical: 11, backgroundColor: "white" }}
              />
              <Text style={{ color: "white" }}>
                Duração: {item.duracao} min
              </Text>
              <Divider
                style={{ marginVertical: 11, backgroundColor: "white" }}
              />
              <Text style={{ color: "white" }}>
                Lançamento: {item.dataLancamento}
              </Text>
              <Divider
                style={{ marginVertical: 11, backgroundColor: "white" }}
              />
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
          <Button
            icon="pencil"
            onPress={() => navigation.navigate("AnimeForm", item)}
          />
          <Button
            icon="delete"
            onPress={() => confirmarRemocao(item.id)}
            buttonColor="red"
          />
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {animes.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Nenhum anime cadastrado
        </Text>
      )}
      {animes.length === 1 && (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderCard(animes[0])}
        </ScrollView>
      )}
      {animes.length > 1 && (
        <View style={styles.carouselWrapper}>
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
        </View>
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
    paddingTop: 25,
    backgroundColor: "grey",
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
    gap: 10,
  },
  videoContainer: {
    flex: 1,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
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
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 50,
    backgroundColor: "lightgreen",
  },
  carouselWrapper: {
    marginTop: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});
