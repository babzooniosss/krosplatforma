import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    const addTask = () => {
        if (input.trim()) {
            setTasks([...tasks, { id: Date.now().toString(), text: input, completed: false }]);
            setInput('');
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const toggleTaskCompletion = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const TaskItem = ({ item }) => (
        <View style={styles.taskContainer}>
            <TouchableOpacity
                style={[styles.taskTextContainer, item.completed && styles.completedTask]}
                onPress={() => toggleTaskCompletion(item.id)}
            >
                <Text style={styles.taskText}>{item.text}</Text>
            </TouchableOpacity>
            <Button title="Удалить" color="red" onPress={() => deleteTask(item.id)} />
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TODO List</Text>
            <TextInput
                style={styles.input}
                placeholder="Добавьте новую задачу"
                value={input}
                onChangeText={setInput}
            />
            <Button title="Добавить" onPress={addTask} />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TaskItem item={item} />}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    list: {
        marginTop: 20,
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,
    },
    taskTextContainer: {
        flex: 1,
        paddingRight: 10,
    },
    completedTask: {
        textDecorationLine: 'line-through',
        opacity: 0.6,
    },
    taskText: {
        fontSize: 16,
    },
});
