import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const categories = ['Houses', 'Lands', 'Shops'];

export default function CreatePost() {
  const router = useRouter();

  const [images, setImages] = useState([]);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');

  const pickImagesFromAlbum = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImages((prev) => [...prev, selectedUri]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled) {
      setImages((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const geocodeLocation = async (loc) => {
    if (!loc.trim()) return;

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: { address: loc, key: 'YOUR_GOOGLE_API_KEY' },
        }
      );

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        // You can handle geocoding results here if needed
      } else {
        alert('Location not found');
      }
    } catch (error) {
      alert('Failed to locate address');
    }
  };

  const handlePost = () => {
    if (
      !price ||
      !category ||
      !description ||
      !location ||
      !contact ||
      images.length === 0
    ) {
      alert('Please fill in all fields and select at least one image.');
      return;
    }
    alert('Form validated! (No backend submission in this version)');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create New Post</Text>

      <Text style={styles.label}>Images</Text>
      <View style={styles.imagesContainer}>
        {images.map((uri, idx) => (
          <Image key={idx} source={{ uri }} style={styles.imagePreview} />
        ))}
      </View>

      <View style={styles.imageButtonsRow}>
        <View style={styles.imageButtonWrapper}>
          <Button
            title="Pick Images"
            onPress={pickImagesFromAlbum}
            color="#7B3FE4"
          />
        </View>
        <View style={styles.imageButtonWrapper}>
          <Button title="Take Photo" onPress={takePhoto} color="#7B3FE4" />
        </View>
      </View>

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a category" value="" />
          {categories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter description"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        onBlur={() => geocodeLocation(location)}
        placeholderTextColor="#666"
      />

      <Text style={styles.label}>Contact Info</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter contact details"
        value={contact}
        onChangeText={setContact}
        placeholderTextColor="#666"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F3E8FF',
  },
  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#7B3FE4',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    marginTop: 20,
    color: '#4B387A',
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B39DDB',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    backgroundColor: '#fff',
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagesContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  imageButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageButtonWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#B39DDB',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginHorizontal: 0,
  },
  picker: {
    height: 50,
    color: '#4B387A',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    gap: 10,
  },
  postButton: {
    backgroundColor: '#7B3FE4',
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  postButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 22,
  },
  connectButton: {
    backgroundColor: '#7B3FE4',
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  connectButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 22,
  },
});
