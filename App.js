import React, { useState, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import PlannerScreen from './screens/PlannerScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import ChoresScreen from './screens/ChoresScreen';
import SettingsScreen from './screens/SettingsScreen';

// Create a Context to share tasks across screens
export const TasksContext = createContext({
  tasks: [],
  setTasks: () => {},
});

const Tab = createBottomTabNavigator();

export default function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName = 'help-circle-outline';
              if (route.name === 'Planner') iconName = 'calendar-outline';
              else if (route.name === 'Projects') iconName = 'layers-outline';
              else if (route.name === 'Chores') iconName = 'list-outline';
              else if (route.name === 'Settings') iconName = 'settings-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Planner" component={PlannerScreen} />
          <Tab.Screen name="Projects" component={ProjectsScreen} />
          <Tab.Screen name="Chores" component={ChoresScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TasksContext.Provider>
  );
}
