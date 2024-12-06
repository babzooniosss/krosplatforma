import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import Modalize from 'react-native-modalize'; // Import Modalize

export default function App() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [modalVisible, setModalVisible] = useState(false); // State for modal
    const [completedTasks, setCompletedTasks] = useState([]); // State for completed tasks

    const addTask = () => {
        if (input.trim()) {
            setTasks([...tasks, { id: Date.now().toString(), text: input, completed: false }]);
            setInput('');
        }
    };

    const deleteTask = (id) => {
        Alert.alert(
            'Подтверждение',
            'Точно удалить?',
            [
                { text: 'Нет', style: 'cancel' },
                {
                    text: 'Да',
                    onPress: () => {
                        setTasks(tasks.filter((task) => task.id !== id));
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const toggleTaskCompletion = (id) => {
        setTasks(
            tasks.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
        updateCompletedTasks(); //Update completed tasks list after toggle
    };

    const updateCompletedTasks = () => {
        setCompletedTasks(tasks.filter(task => task.completed));
    }

    const showCompletedTasksModal = () => {
        updateCompletedTasks(); // Ensure completedTasks is up-to-date
        setModalVisible(true);
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

    const CompletedTaskItem = ({item}) => (
        <View style={styles.taskContainer}>
            <Text style={[styles.taskText, styles.completedTask]}>{item.text}</Text>
        </View>
    )

    return (
        <View style={styles.container}>
