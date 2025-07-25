import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import PlannerScreen from './screens/PlannerScreen';
import ChoresScreen  from './screens/ChoresScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName = 'help-circle-outline';
            if (route.name === 'Planner')  iconName = 'calendar-outline';
            if (route.name === 'Chores')   iconName = 'list-outline';
            if (route.name === 'Settings') iconName = 'settings-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Planner" component={PlannerScreen} />
        <Tab.Screen name="Chores"  component={ChoresScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
