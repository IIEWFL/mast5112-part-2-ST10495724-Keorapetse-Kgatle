import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, courseType } from '../App';

//Define the props for FilterScreen component
export type FilterScreenProps = NativeStackScreenProps<RootStackParamList, 'Filter'> & {
  setFilter: React.Dispatch<React.SetStateAction<courseType | 'All'>>;
};

//FilterScreen component to select course type for filtering menu items
const FilterScreen: React.FC<FilterScreenProps> = ({ navigation, setFilter }) => {
  //State to track selected course
  const [selectedCourse, setSelectedCourse] = useState<courseType | 'All'>('All');
  //Available course options including 'All'
  const courses: (courseType | 'All')[] = ['All', 'Starters', 'Mains', 'Desserts'];

  //Handle course selection and update filter
  const handleSelect = (course: courseType | 'All') => {
    setSelectedCourse(course);
    setFilter(course);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Screen title */}
      <Text style={styles.title}>Filter by Course</Text>
      {/* Course selection buttons */}
      <View style={styles.filterGroup}>
        {courses.map((course, index) => (
          <TouchableOpacity
            key={course}
            onPress={() => handleSelect(course)}
            style={[
              styles.filterButton,
              selectedCourse === course ? styles.active : styles.inactive,
              index !== courses.length - 1 && { marginBottom: 15 }, // Add margin except for last item
            ]}
          >
            <Text
              style={[
                styles.filterText,
                selectedCourse === course ? styles.activeText : styles.inactiveText,
              ]}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffdf6', padding: 20, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#e07a5f', marginBottom: 30 },
  filterGroup: { flexDirection: 'column', alignItems: 'center' },
  filterButton: { width: '80%', paddingVertical: 15, borderRadius: 10, alignItems: 'center' },
  active: { backgroundColor: '#d32f2f' },
  inactive: { backgroundColor: '#fbc02d' },
  filterText: { fontSize: 18, fontWeight: '600' },
  activeText: { color: '#fff' },
  inactiveText: { color: '#000' },
  backButton: { marginTop: 40, alignSelf: 'center', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 10, backgroundColor: '#e0e0e0' },
  backText: { fontSize: 16, color: '#333' },
});

export default FilterScreen;