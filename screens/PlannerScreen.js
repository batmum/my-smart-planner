// screens/PlannerScreen.js
import React, { useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

export default function PlannerScreen() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addTask = (newTask) => {
    setTasks(prev => [...prev, { id: Date.now().toString(), ...newTask }]);
    setShowForm(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TaskItem task={item} />}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setShowForm(true)}>
        <Ionicons name="add-circle" size={64} color="#007AFF" />
      </TouchableOpacity>
      {showForm && <TaskForm onClose={() => setShowForm(false)} onSave={addTask} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  addButton: { position: 'absolute', bottom: 32, right: 32 }
});
