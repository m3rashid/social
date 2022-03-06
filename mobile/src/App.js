/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import Home from './screens/home';
import Chats from './screens/chats';
import Settings from './screens/settings';
import Notifications from './screens/notifications';
import Profile from './screens/profile';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'Chats':
                iconName = 'comments';
                break;
              case 'Profile':
                iconName = 'user';
                break;
              case 'Notifications':
                iconName = 'bell';
                break;
              case 'Settings':
                iconName = 'cog';
                break;
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Chats" component={Chats} options={{tabBarBadge: 3}} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{tabBarBadge: 6}}
        />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
      {/* <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <Text style={{fontWeight: '700', fontSize: 20}}>Hello World</Text>
          </View>
        </ScrollView>
      </SafeAreaView> */}
    </NavigationContainer>
  );
};

export default App;
