import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function App() {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.displayText}>{text}</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите текст"
        value={text}
        onChangeText={(value) => setText(value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  displayText: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white'
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    width: '80%',
    paddingHorizontal: 10,
  },
});


