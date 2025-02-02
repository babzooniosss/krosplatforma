import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { TodoItem } from './todoItem';
import { useTheme } from '../contexts/ThemeContext';
import { Todo } from '../stores/TodoStore';
import { Portal } from 'react-native-portalize';

interface CompletedTodosModalProps {
  modalizeRef: React.RefObject<Modalize>;
  completedTodos: Todo[];
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string, completed: boolean) => void;
}

const CompletedTodosModal: React.FC<CompletedTodosModalProps> = ({
  modalizeRef,
  completedTodos,
  onDeleteTodo,
  onToggleTodo,
}) => {
  const { theme } = useTheme();

  return (
    <Portal>
      <Modalize
        ref={modalizeRef}
        modalStyle={[styles.modal, { backgroundColor: theme.colors.card }]}
        adjustToContentHeight
      >
        <View style={styles.content}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Completed Todos
          </Text>
          <FlatList
            data={completedTodos}
            renderItem={({ item }) => (
              <TodoItem
                todo={item}
                onDelete={onDeleteTodo}
                onToggle={onToggleTodo}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </Modalize>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 20,
  },
  content: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default CompletedTodosModal; 