import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AllUsersScreen = () => {
  const [users, setUsers] = useState([
    {
      id: 'u1',
      name: 'Anusha',
      email: 'anusha@example.com',
      posts: [{ id: 'p1' }, { id: 'p2' }],
    },
    {
      id: 'u2',
      name: 'Sneha',
      email: 'sneha@example.com',
      posts: [{ id: 'p3' }],
    },
  ]);

  const handleDeleteUser = (userId) => {
    Alert.alert('Delete User', 'Are you sure you want to delete this user?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setUsers(users.filter((u) => u.id !== userId)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Panel</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.posts}>Posts: {item.posts.length}</Text>
            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => handleDeleteUser(item.id)}
            >
              <Ionicons name="trash" size={18} color="#fff" />
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default AllUsersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  posts: {
    fontSize: 14,
    marginVertical: 5,
  },
  deleteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d11a2a',
    padding: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  deleteText: {
    color: '#fff',
    marginLeft: 6,
  },
});
