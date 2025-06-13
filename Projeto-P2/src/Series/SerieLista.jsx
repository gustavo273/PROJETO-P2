import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, ScrollView, Alert } from "react-native";
import {
  Card,
  Text,
  FAB,
  Divider,
  Chip,
  Avatar,
  Surface,
  IconButton,
  ProgressBar,
  Badge,
} from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import SerieService from "./SerieService";
import { WebView } from "react-native-webview";

const { width: screenWidth } = Dimensions.get("window");

export default function SerieLista({ navigation }) {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    buscarSeries();
  }, []);

  async function buscarSeries() {
    const lista = await SerieService.listar();
    setSeries(lista);
  }

  async function removerSerie(id) {
    await SerieService.remover(id);
    alert("Série excluída com sucesso!");
    buscarSeries();
  }

  function confirmarRemocao(id) {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta série?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => removerSerie(id),
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
              left={(props) => <Avatar.Icon {...props} icon="television" />}
              titleStyle={{ color: "white" }}
            />
            <Card.Content>
              <Text style={{ color: "white" }}>Gênero: {item.genero}</Text>
              <Divider
                style={{ marginVertical: 11, backgroundColor: "white" }}
              />
              <Text style={{ color: "white" }}>
                Temporadas: {item.temporada}
              </Text>
              <Divider
                style={{ marginVertical: 11, backgroundColor: "white" }}
              />
              <Text style={{ color: "white" }}>
                Ano de Estreia: {item.dataLancamento}
              </Text>
              <Divider style={{ marginVertical: 11, backgroundColor: "" }} />
              <Text style={{ color: "white" }}>Classificação:</Text>
              <Chip
                icon="star"
                style={{ marginTop: 6, backgroundColor: "black" }}
                textStyle={{ color: "white" }}
              >
                {item.classificacao}
              </Chip>
              <Divider />
              <Text style={{ color: "white", marginTop: 8 }}>
                Popularidade:
              </Text>
              <ProgressBar
                progress={0.6}
                color="lightgreen"
                style={{ height: 8, borderRadius: 5, marginTop: 4 }}
              />
              <Badge
                style={{
                  backgroundColor: "purple",
                  alignSelf: "flex-start",
                  marginTop: 10,
                }}
              >
                Recém Adicionado
              </Badge>
            </Card.Content>
          </View>
        </View>
        <Card.Actions style={styles.actions}>
          <IconButton
            icon="pencil"
            onPress={() => navigation.navigate("FilmeForm", item)}
          />
          <IconButton
            icon="delete"
            onPress={() => confirmarRemocao(item.id)}
            iconColor="red"
          />
        </Card.Actions>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      {series.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Nenhuma série cadastrada
        </Text>
      )}
      {series.length === 1 && (
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderCard(series[0])}
        </ScrollView>
      )}
      <Surface
        style={{ padding: 16, margin: 10, elevation: 4, borderRadius: 8 }}
      >
        <Text style={{ fontWeight: "bold" }}>
          Total de Séries: {series.length}
        </Text>
      </Surface>
      {series.length > 1 && (
        <View style={styles.carouselWrapper}>
          <Carousel
            loop
            width={screenWidth}
            height={screenWidth * 1.2}
            autoPlay={true}
            autoPlayInterval={3000}
            data={series}
            scrollAnimationDuration={500}
            renderItem={({ index }) => renderCard(series[index])}
            mode="parallax"
          />
        </View>
      )}
      <FAB
        icon="plus"
        label="Cadastrar"
        style={styles.fab}
        onPress={() => navigation.navigate("SerieForm")}
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
    backgroundColor: "lightgreen",
    bottom: 50,
  },
  carouselWrapper: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
