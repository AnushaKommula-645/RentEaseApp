import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';

const HouseScreen = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('http://192.168.0.100:5000/api/posts/category/Houses');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHouses(data);
      } catch (error) {
        console.error('Error fetching houses:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.images && item.images.length > 0 && (
        <Image
          source={{ uri: `http://192.168.0.100:5000/${item.images[0].replace(/\\/g, '/')}` }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>Price: {item.price}</Text>
      <Text style={styles.description}>Description: {item.description}</Text>
      <Text style={styles.info}>Location: {item.location}</Text>
      <Text style={styles.info}>Email: {item.email}</Text>
      <Text style={styles.info}>Contact: {item.contact}</Text>

      <TouchableOpacity
        style={styles.callButton}
        onPress={() => handleCall(item.contact)}
      >
        <Text style={styles.callText}>Call</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Houses...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={houses}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    marginBottom: 3,
  },
  callButton: {
    marginTop: 10,
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  callText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HouseScreen;
