import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Mock user data
const user = {
  name: 'Anusha',
  email: 'anusha@example.com',
  phone: '9876543210',
};

// Sample posts with images
const initialPosts = [
  {
    id: '1',
    title: 'Study Table for Rent',
    location: 'Vishnu College Hostel',
    rent: '₹150/month',
    image: require('../assets/apartment1.jpg'),
  },
  {
    id: '2',
    title: 'Old Books Set',
    location: 'Block 3, SVECW',
    rent: '₹50',
    image: require('../assets/apartment2.jpg'),
  },
  {
    id: '3',
    title: 'Old grandma house',
    location: 'Amalapuram',
    rent: '₹50',
    image: require('../assets/apartment2.jpg'),
  },
  {
    id: '4',
    title: 'Study Table for Rent',
    location: 'Vishnu College Hostel',
    rent: '₹150/month',
    image: require('../assets/apartment1.jpg'),
  },
  {
    id: '5',
    title: 'Old Books Set',
    location: 'Block 3, SVECW',
    rent: '₹50',
    image: require('../assets/apartment2.jpg'),
  },
  {
    id: '6',
    title: 'Old grandma house',
    location: 'Amalapuram',
    rent: '₹50',
    image: require('../assets/apartment2.jpg'),
  },
];

const AccountScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState(initialPosts);

  const handleDelete = (id) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this post?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setPosts((prev) => prev.filter((post) => post.id !== id)),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#541890" barStyle="light-content" />

      {/* Top Nav */}
      <View style={styles.topNav}>
        <Text style={styles.navTitle}>My Profile</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={require('../assets/profileicon.png')} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone}</Text>
      </View>
      
      {/*logout */}
      <TouchableOpacity style={styles.logoutBtn} onPress={() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        });
      }}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* My Posts Header */}
      <Text style={styles.myPostsHeader}>My Posts</Text>

      {/* Posts List */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.postList}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.detail}>Location: {item.location}</Text>
            <Text style={styles.detail}>Rent: {item.rent}</Text>
            <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash" size={18} color="#fff" />
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Image source={require('../assets/home.jpg')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('PostScreen')}>
          <Image source={require('../assets/posticon.jpg')} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('HiScreen')}>
          <Image source={require('../assets/accounticon.jpg')} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topNav: {
    backgroundColor: '#541890',
    padding: 20,
    alignItems: 'center',
  },
  navTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  phone: {
    fontSize: 14,
    color: '#555',
  },
  myPostsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 16,
  },
  postList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    elevation: 3,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  detail: {
    fontSize: 14,
    marginTop: 2,
    color: '#333',
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d11a2a',
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  deleteText: {
    color: '#fff',
    marginLeft: 6,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navIcon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#541890',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
  },
  logoutText: {
    color: '#fff',
    alignContent: 'center',
    marginLeft: 8,
    fontWeight: 'bold',
  },
});
