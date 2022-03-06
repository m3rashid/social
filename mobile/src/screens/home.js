import React from 'react';
import {Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
import Profile from './profile';

const Home = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Profile" component={Profile} />
      <View>
        <Text>This is the Home page</Text>
      </View>
    </Drawer.Navigator>
  );
};

export default Home;
