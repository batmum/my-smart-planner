// screens/ProjectsScreen.js
import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { TasksContext } from '../App';
import TaskItem from './TaskItem';

export default function ProjectsScreen() {
  const { tasks } = useContext(TasksContext);
  const projects = tasks.filter(task => task.subtasks && task.subtasks.length > 0);

  if (projects.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>No projects yet. Create tasks with subtasks!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={projects}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <TaskItem task={item} />}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  list: {
    padding: 16
  }
});
