import React from "react";
import { View, Text, FlatList } from "react-native";

const ReviewPage = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>{item.nama} Reviews</Text>
      <FlatList
        data={item.reviews}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16 }}>Rating: {item.rating}</Text>
            <Text>{item.comment}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default ReviewPage;