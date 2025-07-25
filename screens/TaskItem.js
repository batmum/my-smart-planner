// screens/TaskItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TaskItem({ task }) {
  return (
    <View style={itemStyles.container}>
      <Text style={itemStyles.title}>{task.title}</Text>
      <Text>⏱ {task.duration}   {task.category}</Text>
      {task.subtasks && task.subtasks.map((st, i) => (
        <Text key={i} style={itemStyles.subtask}>• {st}</Text>
      ))}
    </View>
  );
}

const itemStyles = StyleSheet.create({
  container: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  subtask: { marginLeft: 10, color: '#555' }
});
