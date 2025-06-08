import React, { useEffect, useState } from "react";
import { View, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Text, FAB, Divider, Chip } from "react-native-paper";
import Carousel from "react-native-reanimated-carousel";
import SerieService from "./SerieService";

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

  const renderCard = (item) => (
    <Card style={styles.card} key={item.id} elevation={5}>
      {item.imagemUrl && (
        <Card.Cover source={{ uri: item.imagemUrl }} style={styles.image} />
      )}
      <Card.Title title={item.titulo} titleStyle={{ fontWeight: "bold" }} />

      <Card.Content>
        <Text>Gênero: {item.genero}</Text>
        <Divider style={{ marginVertical: 8 }} />
        <Text>Temporadas: {item.temporadas}</Text>
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
          onPress={() => navigation.navigate("SerieForm", item)}
        />
        <Button icon="delete" onPress={() => removerSerie(item.id)} />
      </Card.Actions>
    </Card>
  );

  return (
    <View style={styles.container}>
      {series.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          Nenhuma série cadastrada
        </Text>
      )}

      {series.length === 1 && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {renderCard(series[0])}
        </ScrollView>
      )}

      {series.length > 1 && (
        <Carousel
          loop
          width={screenWidth}
          height={screenWidth * 1.2}
          data={series}
          scrollAnimationDuration={500}
          renderItem={({ index }) => renderCard(series[index])}
          mode="parallax"
        />
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
