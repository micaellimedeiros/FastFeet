import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Deliveries from '~/pages/Deliveries';
import Details from '~/pages/Deliveries/Details';
import NewProblem from '~/pages/Deliveries/NewProblem';
import Problems from '~/pages/Deliveries/Problems';
import Confirm from '~/pages/Deliveries/Confirm';

const Stack = createStackNavigator();

export default function DeliveryRoutes() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#FFF',
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Deliveries"
        component={Deliveries}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerTitle: 'Detalhes da encomenda',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitleStyle: { fontWeight: 'bold' },
          headerTintColor: '#fff',
          headerLeftContainerStyle: {
            left: 10,
          },
        }}
      />
      <Stack.Screen
        name="NewProblem"
        component={NewProblem}
        options={{
          title: 'Informar problema',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeftContainerStyle: {
            left: 10,
          },
        }}
      />
      <Stack.Screen
        name="Problems"
        component={Problems}
        options={{
          title: 'Visualizar problemas',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeftContainerStyle: {
            left: 10,
          },
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          title: 'Confirmar agendamento',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTitleStyle: { fontWeight: 'bold' },
          headerLeftContainerStyle: {
            left: 10,
          },
        }}
      />
    </Stack.Navigator>
  );
}
