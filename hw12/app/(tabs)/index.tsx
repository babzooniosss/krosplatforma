import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import { observer } from 'mobx-react-lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { todoStore } from '../stores/TodoStore';
import { TodoItem } from '../components/todoItem';
import { LoadingSpinner } from '../components/loadingSpinner';
import { useTheme } from '../contexts/ThemeContext';
import { Modalize } from 'react-native-modalize';
import CompletedTodosModal from '../components/CompletedTodosModal';
import { SPACING, FONTS } from '../constants/theme';
import { useTranslation } from 'react-i18next';

const HomeScreen: React.FC = observer(() => {
  const { theme } = useTheme();
  const [newTodo, setNewTodo] = React.useState('');
  const modalizeRef = useRef<Modalize>(null);
  const { t } = useTranslation();

  React.useEffect(() => {
    const initTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        if (storedTodos) {
          todoStore.setTodos(JSON.parse(storedTodos));
        }
        await todoStore.fetchTodos();
      } catch (error) {
        todoStore.setError(t('errors.loadFailed'));
      }
    };

    initTodos();
  }, [t]);

  const addTodo = async () => {
    if (newTodo.trim()) {
      try {
        await todoStore.addTodo(newTodo);
        setNewTodo('');
      } catch (error) {
        todoStore.setError(t('errors.addFailed'));
      }
    }
  };

  const handleShowCompletedTodos = () => {
    modalizeRef.current?.open();
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoStore.deleteTodo(id);
    } catch (error) {
      todoStore.setError(t('errors.deleteFailed'));
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    try {
      await todoStore.toggleTodo(id, completed);
    } catch (error) {
      todoStore.setError(t('errors.toggleFailed'));
    }
  };

  if (todoStore.loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{t('headers.home')}</Text>
      
      {todoStore.error && (
        <Text style={[styles.errorText, { color: theme.colors.text }]}>{todoStore.error}</Text>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { 
              borderColor: theme.colors.border,
              color: theme.colors.text,
              backgroundColor: theme.colors.card,
            }
          ]}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder={t('placeholders.addTodo')}
          placeholderTextColor={theme.colors.border}
          editable={!todoStore.addingTodo}
        />
        <TouchableOpacity 
          style={[
            styles.addButton,
            { backgroundColor: theme.colors.primary },
            todoStore.addingTodo && styles.disabledButton
          ]} 
          onPress={addTodo}
          disabled={todoStore.addingTodo}
        >
          <Text style={styles.addButtonText}>
            {todoStore.addingTodo ? t('buttons.adding') : t('buttons.add')}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todoStore.todos}
        renderItem={({ item }) => (
          <TodoItem 
            todo={item} 
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
          />
        )}
        keyExtractor={item => item.id}
      />

      <Button 
        title={t('buttons.showCompletedTodos')}
        onPress={handleShowCompletedTodos}
      />

      <CompletedTodosModal
        modalizeRef={modalizeRef}
        completedTodos={todoStore.todos.filter(todo => todo.completed)}
        onDeleteTodo={handleDeleteTodo}
        onToggleTodo={handleToggleTodo}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.md,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: SPACING.sm,
    marginRight: SPACING.sm,
    fontSize: FONTS.regular,
  },
  addButton: {
    padding: SPACING.sm,
    borderRadius: 5,
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  addButtonText: {
    color: 'white',
    fontSize: FONTS.regular,
  },
  errorText: {
    marginBottom: SPACING.md,
    fontSize: FONTS.regular,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
});

export default HomeScreen;
