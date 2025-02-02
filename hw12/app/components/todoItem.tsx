import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Todo } from '../stores/TodoStore';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onToggle }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => onToggle(todo.id, !todo.completed)}
      >
        <Ionicons
          name={todo.completed ? 'checkmark-circle' : 'ellipse-outline'}
          size={24}
          color={theme.colors.primary}
        />
      </TouchableOpacity>
      
      <Text
        style={[
          styles.text,
          { color: theme.colors.text },
          todo.completed && styles.completedText
        ]}
      >
        {todo.text}
      </Text>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(todo.id)}
      >
        <Ionicons name="trash-outline" size={24} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  checkbox: {
    marginRight: 10,
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  deleteButton: {
    marginLeft: 10,
  },
});