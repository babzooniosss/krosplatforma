import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import { Modalize }  from 'react-native-modalize';
import { ThemeProvider, useTheme } from '@/src/modules/theme/theme';
import { Colors } from '@/src/styles/colors/colors';

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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: Colors.backgroundPrimary[theme],
        },
        item: {
            marginBottom: 10,
            padding: 10,
            backgroundColor: Colors.buttonBackground[theme],
            borderRadius: 5,
        },
        text: {
            color: Colors.textPrimary[theme],
        },
        modalContent: {
            padding: 16,
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 16,
            color: Colors.textPrimary[theme],
        },
        completedItem: {
            marginBottom: 10,
            padding: 10,
            backgroundColor: Colors.textSecondary[theme],
            borderRadius: 5,
        },
    });


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Button
                    title={`Переключить тему (${theme === 'light' ? 'Тёмная' : 'Светлая'})`}
                    onPress={toggleTheme}
                    color={Colors.textPrimary[theme]}
                />
                <Button
                    title="Посмотреть завершенные задачи"
                    onPress={openModalize}
                    color={Colors.textPrimary[theme]}
                />

                <ScrollView>
                    {itemStore.items.map((item) => (
                        <View key={item.id} style={styles.item}>
                            <Text style={styles.text}>{item.title}</Text>
                            <Button
                                title="Завершить"
                                onPress={() => confirmDelete(item.id)}
                                color={Colors.textPrimary[theme]}
                            />
                        </View>
                    ))}
                </ScrollView>


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
