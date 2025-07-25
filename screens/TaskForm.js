// screens/TaskForm.js
import React, { useState } from 'react';
import {
  View, Text, TextInput, Button, Modal,
  StyleSheet, ScrollView, Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const presetTimes = ['15m','30m','1h','2h'];
const defaultCategories = ['🏡 Home','💼 Work','🧒 Kids','🩺 Health','🧹 Chores','💰 Finance'];

export default function TaskForm({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState(defaultCategories[0]);
  const [assigned, setAssigned] = useState('Meili');
  const [subtasks, setSubtasks] = useState([]);
  const [newCategory, setNewCategory] = useState('');

  const suggestSubtasks = () => {
    // placeholder for GPT call
    const suggestions = ['Subtask 1', 'Subtask 2', 'Subtask 3'];
    setSubtasks(suggestions);
  };

  const handleSave = () => {
    if (!title) {
      Alert.alert('Title is required');
      return;
    }
    onSave({ title, duration, category, assigned, subtasks });
  };

  const handleDurationWarning = (val) => {
    setDuration(val);
    const num = parseFloat(val);
    if (num > 3) {
      Alert.alert('Heads up', 'This duration seems long. Consider breaking it up or increasing time.');
    }
  };

  return (
    <Modal transparent animationType="slide">
      <View style={styles.overlay}>
        <ScrollView style={styles.form}>
          <Text style={styles.heading}>New Task</Text>

          <TextInput
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />

          <Button title="Suggest Subtasks" onPress={suggestSubtasks} />
          {subtasks.map((st, i) => (
            <Text key={i}>• {st}</Text>
          ))}

          <Text style={{ marginTop: 10 }}>Duration</Text>
          <View style={styles.timeRow}>
            {presetTimes.map(t => (
              <Button key={t} title={t} onPress={() => setDuration(t)} />
            ))}
          </View>
          <TextInput
            placeholder="Custom duration (e.g. 1.5)"
            value={duration}
            onChangeText={handleDurationWarning}
            style={styles.input}
            keyboardType="numeric"
          />

          <Text style={{ marginTop: 10 }}>Category</Text>
          <Picker
            selectedValue={category}
            onValueChange={setCategory}
            style={styles.picker}
          >
            {defaultCategories.map(cat => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
            {newCategory ? <Picker.Item label={newCategory} value={newCategory} /> : null}
          </Picker>
          <TextInput
            placeholder="Add custom category (emoji+name)"
            value={newCategory}
            onChangeText={setNewCategory}
            style={styles.input}
          />

          <Text style={{ marginTop: 10 }}>Assigned to</Text>
          <TextInput
            placeholder="Assigned to"
            value={assigned}
            onChangeText={setAssigned}
            style={styles.input}
          />

          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onClose} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' },
  form: { margin: 20, backgroundColor: 'white', padding: 20, borderRadius: 8 },
  heading: { fontSize: 18, marginBottom: 12, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginVertical: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  picker: { height: 50, width: '100%' }
});
