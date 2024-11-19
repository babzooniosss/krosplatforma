import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { observer } from 'mobx-react-lite';
import { makeAutoObservable } from 'mobx';

// Хранилище для задач
class TaskStore {
    tasks = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTask(text) {
        if (text.trim()) {
            this.tasks.push({ id: Date.now().toString(), text, completed: false });
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    toggleTaskCompletion(id) {
        const task = this.tasks.find((task) => task.id === id);
        if (task) {
            task.completed = !task.completed;
        }
    }
}

// Создание экземпляра хранилища
const taskStore = new TaskStore();

// Главный компонент
const App = observer(() => {
    const [input, setInput] = useState('');

    const addTask = () => {
        taskStore.addTask(input);
        setInput('');
    };

    const TaskItem = ({ item }) => (
        <View style={styles.taskContainer}>
            <TouchableOpacity
                style={[styles.taskTextContainer, item.completed && styles.completedTask]}
                onPress={() => taskStore.toggleTaskCompletion(item.id)}
            >
                <Text style={styles.taskText}>{item.text}</Text>
            </TouchableOpacity>
            <Button title="Удалить" color="red" onPress={() => taskStore.deleteTask(item.id)} />
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
                data={taskStore.tasks.slice()} // Преобразуем MobX-объект в обычный массив
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TaskItem item={item} />}
                style={styles.list}
            />
        </View>
    );
});

export default App;

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

