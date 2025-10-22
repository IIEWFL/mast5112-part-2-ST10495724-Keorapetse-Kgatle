import React, { useState } from 'react';
import {View,Text,TextInput,Alert,TouchableOpacity,StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, RootStackParamList, courseType } from '../App';

//Define the props for AddMenuScreen component
interface AddMenuScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'AddMenu'> {
  menuItems: MenuItem[]; //Current list of menu items
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>; //Function to update menu items 
}

//AddMenuScreen component to add new menu items
const AddMenuScreen: React.FC<AddMenuScreenProps> = ({
  navigation,
  menuItems,
  setMenuItems,
}) => {
  //State variables for form inputs
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<courseType>('Starters');
  const [price, setPrice] = useState('');

  //Function to handle adding a new menu item
  const addMenuItem = () => {
    //Validate input fields
    if (!name || !description || !price) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }

    //Validate price input
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert(
        'Invalid Price',
        'Please enter a valid positive number for price.'
      );
      return;
    }
    //Create new menu item object
    const newItem: MenuItem = {
      id: Date.now(), //Use timestamp as unique ID
      name,
      description,
      course,
      price: parsedPrice,
    };

    //Update menu items state with the new item
    setMenuItems([...menuItems, newItem]);
    Alert.alert('Success', `${name} added to Christoffel’s Menu`);
    setName('');
    setDescription('');
    setCourse('Starters');
    setPrice('');
    navigation.goBack(); //Navigate back to Home screen
  };

  return (
    <View style={styles.container}>
      {/* screen title */}
      <Text style={styles.header}>Add New Menu Item</Text>

    {/* Dish Name Input */}
      <TextInput
        placeholder="Dish Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      {/* Description Input */}
      <TextInput
        placeholder="Description"
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Course Picker */}
      <Text style={styles.label}>Select Course:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={course}
          onValueChange={(itemValue) => setCourse(itemValue as courseType)}
        >
          {/* Course Options */}
          <Picker.Item label="Starters" value="Starters" />
          <Picker.Item label="Mains" value="Mains" />
          <Picker.Item label="Desserts" value="Desserts" />
        </Picker>
      </View>

      {/* Price Input */}
      <TextInput
        placeholder="Price (R)"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Add Menu Item Button */}
      <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
        <Text style={styles.addButtonText}>Add Menu Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdf6', // Light background color 
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f', // Red color for header
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddMenuScreen;