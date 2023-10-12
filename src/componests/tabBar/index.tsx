import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "views/home";
import Setting from "views/setting";
import { NavName } from "common/constant";

const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
      <Tab.Navigator
        screenOptions = {({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Setting') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },

          tabBarActiveTintColor: "#00b286",
          tabBarInactiveTintColor: 'gray',
          tabBarStyle:{
            height:70,
            paddingTop: 10,
            paddingBottom: 20,
          }
        })}
      >
        <Tab.Screen name={NavName.Home}  options={{ headerShown:false, title:'首页' }} component={Home} />
        <Tab.Screen name={NavName.Setting} options={{ headerShown:false, title:'设置' }} component={Setting} />
      </Tab.Navigator>
  );
}
export default HomeStack
