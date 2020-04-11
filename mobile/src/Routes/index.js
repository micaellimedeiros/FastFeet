import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons as Icon } from '@expo/vector-icons';

import SignIn from '~/pages/SignIn';
import Deliveries from './DeliveryRoutes';
import Profile from '~/pages/Profile';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function createRouter(isSigned = false) {
  return !isSigned ? (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </>
  ) : (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: '#7d40e7',
        inactiveTintColor: '#ccc',
        labelStyle: {
          fontSize: 14,
        },
        style: {
          backgroundColor: '#fff',
          height: 65,
          paddingTop: 8,
          paddingBottom: 8,
        },
        keyboardHidesTabBar: true,
      }}
    >
      <Tabs.Screen
        name="Deliveries"
        component={Deliveries}
        options={{
          tabBarLabel: 'Entregas',
          tabBarIcon: ({ color }) => (
            <Icon name="reorder" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Meu Perfil',
          tabBarIcon: ({ color }) => (
            <Icon name="account-circle" size={28} color={color} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
