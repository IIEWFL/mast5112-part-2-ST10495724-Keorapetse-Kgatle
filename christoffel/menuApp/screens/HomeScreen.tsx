import React from 'react';
import {View,Text,FlatList,TouchableOpacity,StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, RootStackParamList, courseType } from '../App';

//Define the props for HomeScreen component
interface HomeScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'Home'> {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

//HomeScreen component to display menu items and summary
const HomeScreen: React.FC<HomeScreenProps> = ({
  navigation,
  menuItems,
  setMenuItems,
}) => {
  const totalItems = menuItems.length;//Total number of menu items

  //Calculate average price per course type
  const courseAveragePrice: Record<string, number> = {};
  const courseCounts: Record<string, number> = {};

  //Aggregate prices and counts for each course type
  menuItems.forEach((item) => {
    courseAveragePrice[item.course] =
      (courseAveragePrice[item.course] || 0) + item.price;
    courseCounts[item.course] = (courseCounts[item.course] || 0) + 1;
  });

  //Compute average prices and round to 2 decimal places
  Object.keys(courseAveragePrice).forEach((course) => {
    courseAveragePrice[course] = Number(
      (courseAveragePrice[course] / courseCounts[course]).toFixed(2)
    );
  });

  //Function to handle deletion of a menu item
  function handleDelete(id: number): void {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  }

  return (
    <View style={styles.container}>
      {/* screen title */}
      <Text style={styles.header}>Christoffel's Menu</Text>

      {/* Summary bar showing total items */}
      <View style={styles.summaryBar}>
        <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
      </View>
       
      {/* Average price display per course */}
      {Object.keys(courseAveragePrice).length > 0 && (
        <View style={styles.avgContainer}>
          <Text style={styles.avgTitle}>Average Price by Course:</Text>
          {Object.keys(courseAveragePrice).map((course) => (
            <Text key={course} style={styles.avgText}>
              {course}: R{courseAveragePrice[course].toFixed(2)}
            </Text>
          ))}
        </View>
      )}

      {/* Display message if no menu items are present */}
      {menuItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>No menu items found</Text>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => navigation.navigate('AddMenu')}
          >
            <Text style={styles.mainButtonText}>Add Menu Item</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Text style={styles.itemName}>
                {item.name} - R{item.price.toFixed(2)}
              </Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
              <Text style={styles.itemTag}>{item.course}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate('AddMenu')}
      >
        <Text style={styles.mainButtonText}>Add Menu Item</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate('Filter')}
      >
        <Text style={styles.mainButtonText}>Filter Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffdf6',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e07a5f',
    textAlign: 'center',
    marginBottom: 10,
  },
  summaryBar: {
    backgroundColor: '#e07a5f',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  summaryText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  avgContainer: {
    marginBottom: 15,
  },
  avgTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  avgText: {
    color: '#444',
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDesc: {
    color: '#555',
  },
  itemTag: {
    marginTop: 4,
    backgroundColor: '#fdf6e3',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    color: '#000',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  mainButton: {
    backgroundColor: '#e07a5f',
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: 'center',
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 8,
    backgroundColor: '#d32f2f', // Red color for delete
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
