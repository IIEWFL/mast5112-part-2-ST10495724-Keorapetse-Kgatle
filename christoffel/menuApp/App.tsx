import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Screen components for different app views
import HomeScreen from './screens/HomeScreen';
import AddMenuScreen from './screens/AddMenuScreen';
import FilterScreen from './screens/FilterScreen';

//Types of courses avaliable on the menu
export type courseType = 'Starters' | 'Mains' | 'Desserts';

//interface describing the structure of the menu item
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  course: courseType;
  price: number;
}

//Define the navigation routes and their expected parameters
export type RootStackParamList = {
  Home: undefined;
  AddMenu: undefined;
  Filter: undefined;
};

//create a typed stack navigator for screen routing 
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  //State to hold all menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  //State to manage current corse filter
  const [filter, setFilter] = useState<courseType | 'All'>('All');
//Apply filtering logic based on selected course
  const filteredItems =
    filter === 'All' ? menuItems : menuItems.filter((item) => item.course === filter);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{       
        headerShown: true, // Show the header on all screens     
        gestureEnabled: true, // Enable gesture navigation
        headerTransparent: false, // Header is not transparent 
          headerStyle: { backgroundColor: '#fdf6e3' },// Customize header background color
          headerTitleStyle: { fontWeight: 'bold', fontSize: 20, color: '#e07a5f' },
          headerTintColor: '#e07a5f',//Tint for back button 
        }}
      >
          {/*Home screen displaying the menu items*/}
        <Stack.Screen name="Home" options={{ title: "Christoffel's Menu" }}>
          {(props) => (
            <HomeScreen
              {...props}
              menuItems={filteredItems}
              setMenuItems={setMenuItems}
            />
          )}
        </Stack.Screen>

        {/*Add menu item screen*/}
        <Stack.Screen name="AddMenu" options={{ title: 'Add Menu Item' }}>
          {(props) => (
            <AddMenuScreen
              {...props}
              menuItems={menuItems}
              setMenuItems={setMenuItems}
            />
          )}
        </Stack.Screen>

        {/*Filter screen to select course type*/}
        <Stack.Screen name="Filter" options={{ title: 'Filter by Course' }}>
          {(props) => (
            <FilterScreen
              {...props}
              setFilter={setFilter}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}