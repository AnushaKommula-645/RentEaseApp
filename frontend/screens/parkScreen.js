import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Local images
const apartmentImages = [
  require('../assets/apartment1.jpg'),
  require('../assets/apartment2.jpg'),
  require('../assets/apartment3.jpg'),
];

// Mock Data
const mockPosts = [
  {
    username: 'Ravi Kumar',
    image: Image.resolveAssetSource(apartmentImages[0]).uri,
    price: 7500,
    description: '2BHK Apartment near college with full ventilation.',
    email: 'ravi.kumar@example.com',
    contact: '9876543210',
  },
  {
    username: 'Sita Reddy',
    image: Image.resolveAssetSource(apartmentImages[1]).uri,
    price: 9200,
    description: 'Spacious 3BHK flat with attached washrooms and lift.',
    email: 'sita.reddy@example.com',
    contact: '9988776655',
  },
  {
    username: 'Anil Rao',
    image: Image.resolveAssetSource(apartmentImages[2]).uri,
    price: 6000,
    description: '1BHK budget flat, ideal for students.',
    email: 'anil.rao@example.com',
    contact: '9090909090',
  },
];

const PostItem = ({ post }) => {
  const handleCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.postContainer}>
      <View style={styles.header}>
        <Image source={require('../assets/profileicon.png')} style={styles.profileIcon} />
        <Text style={styles.username}>{post.username}</Text>
      </View>

      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      <Text style={styles.price}>₹ {post.price}</Text>
      <Text style={styles.description}>{post.description}</Text>
      <Text style={styles.email}>📧 {post.email}</Text>

      <TouchableOpacity style={styles.callButton} onPress={() => handleCall(post.contact)}>
        <Ionicons name="call" size={22} color="#fff" />
        <Text style={styles.callText}>Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const PostListScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {/* Top Nav Bar */}
      <View style={styles.topNav}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Posts</Text>
      </View>

      {/* Main Content */}
      <FlatList
        data={mockPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <PostItem post={item} />}
        contentContainerStyle={styles.list}
      />

      {/* Bottom Nav Bar */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../assets/home.jpg')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('PostScreen')}>
          <Image source={require('../assets/posticon.jpg')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AccountScreen')}>
          <Image source={require('../assets/accounticon.jpg')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostListScreen;

const styles = StyleSheet.create({
  list: {
    padding: 16,
    paddingBottom: 80, // so content doesn't hide under bottom nav
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  price: {
    fontSize: 18,
    color: '#2c7',
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 15,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  callText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#541890',
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  navTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  navButton: {
    alignItems: 'center',
  },
  navIcon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
});
