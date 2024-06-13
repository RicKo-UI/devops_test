import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Modal,
  Button as RNButton,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Separator } from "../components";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  reviewContainer: {
    marginTop: 10,
  },
  reviewItem: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
});

const Nerby = () => {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [chooseItem, setChooseItem] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newRating, setNewRating] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      } catch (error) {
        setError("Error getting user location: " + error);
      }
    };
    fetchCurrentLocation();
  }, []);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const listTambalBan = [
    {
      id: 0,
      nama: "Tambal ban cak imin",
      tipe: "Bengkel motor",
      alamat: "Jl bareng cuma temen",
      reviews: [
        { id: 0, rating: 4, comment: "Pelayanan cepat dan ramah" },
        { id: 1, rating: 5, comment: "Harga terjangkau dan kualitas bagus" },
        { id: 2, rating: 5, comment: "Dekat dan terpercaya" },
      ]
    },
    {
      id: 1,
      nama: "Tambal ban jetis kulon",
      tipe: "Bengkel motor",
      alamat: "Jl bareng cuma temen",
      reviews: [
        { id: 0, rating: 4, comment: "Pelayanan cepat dan ramah" },
        { id: 1, rating: 3, comment: "Biasa aja" },
        { id: 2, rating: 3, comment: "Murah tapi lama" },
      ]
    },
    {
      id: 2,
      nama: "Tambal ban mas bro",
      tipe: "Bengkel motor",
      alamat: "Jl bareng cuma temen",
      reviews: [
        { id: 0, rating: 4, comment: "Pelayanan cepat dan ramah" },
        { id: 1, rating: 5, comment: "Harga terjangkau dan kualitas bagus" },
        { id: 2, rating: 5, comment: "Dekat dan terpercaya" },
      ]
    },
    {
      id: 3,
      nama: "Tambal ban sis",
      tipe: "Bengkel mobil",
      alamat: "Jl bareng cuma temen",
      reviews: [
        { id: 0, rating: 4, comment: "Pelayanan cepat dan ramah" },
        { id: 1, rating: 5, comment: "Harga terjangkau dan kualitas bagus" },
        { id: 2, rating: 5, comment: "Dekat dan terpercaya" },
      ]
    },
    {
      id: 4,
      nama: "Tambal ban pak dono",
      tipe: "Bengkel mobil",
      alamat: "Jl bareng cuma temen",
      reviews: [
        { id: 0, rating: 4, comment: "Pelayanan cepat dan ramah" },
        { id: 1, rating: 5, comment: "Harga terjangkau dan kualitas bagus" },
        { id: 2, rating: 5, comment: "Dekat dan terpercaya" },
      ]
    },
    {
      id: 5,
      nama: "Tambal ban banjaya",
      tipe: "Bengkel motor",
      alamat: "Jl bareng cuma temen",
      reviews: [
        { id: 0, rating: 4, comment: "Pelayanan cepat dan ramah" },
        { id: 1, rating: 5, comment: "Harga terjangkau dan kualitas bagus" },
        { id: 2, rating: 5, comment: "Dekat dan terpercaya" },
      ]
    },
    {
      id: 6,
      nama: "Tambal ban barokah",
      tipe: "Bengkel motor",
      alamat: "Jl bareng cuma temen",
      reviews: [
        { id: 0, rating: 4, comment: "Pelayanan cepat dan ramah" },
        { id: 1, rating: 5, comment: "Harga terjangkau dan kualitas bagus" },
        { id: 2, rating: 5, comment: "Dekat dan terpercaya" },
      ]
    },
  ];

  const renderItem = ({ item, index }) => {
    const averageRating =
      item.reviews.reduce((total, review) => total + review.rating, 0) /
      item.reviews.length;

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedItem(item);
          setModalVisible(true);
        }}
        style={{
          height: windowHeight * 0.22,
          width: windowWidth * 0.8,
          borderRadius: 10,
          backgroundColor: index === chooseItem ? "#DCCDE5" : "#FFFFFF",
          borderWidth: 2,
          borderColor: "#A7A7A7",
          marginHorizontal: 15,
          marginVertical: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={require("../assets/tambalBan.jpg")}
          />
        </View>
        <View style={{ flex: 1.3, paddingLeft: 10, justifyContent: "center" }}>
          <Text style={{ fontFamily: "Inter_700Bold", fontSize: 16, color: "#5A1781" }}>
            {item.nama}
          </Text>
          <Separator h={3} />
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12 }}>
            {item.tipe}
          </Text>
          <Separator h={3} />
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12 }}>
            {item.alamat}
          </Text>
          <Text style={{ fontFamily: "Inter_400Regular", fontSize: 12 }}>
            Rating: {averageRating.toFixed(1)} ({item.reviews.length} reviews)
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const addReview = () => {
    if (newRating && newComment && selectedItem) {
      const newReview = {
        id: selectedItem.reviews.length + 1,
        rating: parseFloat(newRating),
        comment: newComment,
      };
      const updatedItem = {
        ...selectedItem,
        reviews: [...selectedItem.reviews, newReview],
      };
      const updatedList = listTambalBan.map((item) =>
        item.id === selectedItem.id ? updatedItem : item
      );
      setSelectedItem(updatedItem);
      setNewRating("");
      setNewComment("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <MapView
          showsUserLocation={true}
          showsCompass={true}
          initialRegion={{
            latitude: parseFloat(-7.3385169),
            longitude: parseFloat(112.719163),
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={{ width: "100%", height: "100%" }}
        ></MapView>
      </View>
      <View
        style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
      >
        <FlatList
          data={listTambalBan}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontFamily: "Inter_700Bold", fontSize: 20, marginBottom: 10 }}>
              {selectedItem && selectedItem.nama}
            </Text>
            <Separator h={3} />
            <FlatList
              data={selectedItem ? selectedItem.reviews : []}
              renderItem={({ item }) => (
                <View style={styles.reviewItem}>
                  <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14 }}>
                    Rating: {item.rating}
                  </Text>
                  <Text style={{ fontFamily: "Inter_400Regular", fontSize: 14 }}>
                    Comment: {item.comment}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            <TextInput
              style={styles.input}
              placeholder="Rating"
              value={newRating}
              onChangeText={setNewRating}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Comment"
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity style={styles.button} onPress={addReview}>
              <Text style={styles.buttonText}>Add Review</Text>
            </TouchableOpacity>
            <View style={styles.closeButton}>
              <RNButton
                title="Close"
                onPress={() => setModalVisible(!modalVisible)}
                color="#c4001f"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Nerby;
