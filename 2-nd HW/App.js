import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      {/* Первый вариант - Использование View и Text */}
      <View style={styles.section}>
        <Text style={[styles.text, { color: 'blue' }]}>Hello, React Native!</Text>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>This is the first variant.</Text>
        <Text style={[styles.text, { fontSize: 24 }]}>Text components with different props.</Text>
      </View>

      {/* Второй вариант - Использование View и Image */}
      <View style={styles.section}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
          }}
          style={[styles.image, { borderRadius: 10 }]}
        />
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
          }}
          style={[styles.image, { borderWidth: 3, borderColor: 'black' }]}
        />
        <Image
          source={{
            uri: 'https://avatars.mds.yandex.net/i?id=e632405c2e56a29471e7375cbbf43d33dc68d2e3-12421676-images-thumbs&n=13',
          }}
          style={[styles.image, { transform: [{ rotate: '0deg' }] }]}
        />
      </View>

      {/* Третий вариант - Использование View, Text и ScrollView */}
      <View style={styles.section}>
        <Text style={[styles.text, { color: 'green' }]}>Scroll through the list of items:</Text>
        <ScrollView horizontal style={styles.horizontalScroll}>
          <Text style={[styles.scrollItem, { backgroundColor: 'lightgrey' }]}>Погода</Text>
          <Text style={[styles.scrollItem, { backgroundColor: 'lightblue' }]}>Карты</Text>
          <Text style={[styles.scrollItem, { backgroundColor: 'lightgreen' }]}>Контакты 3</Text>
          <Text style={[styles.scrollItem, { backgroundColor: 'lightpink' }]}>Vk</Text>
          <Text style={[styles.scrollItem, { backgroundColor: 'lightyellow' }]}>Одноклассники</Text>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  section: {
    marginVertical: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    margin: 5,
  },
  image: {
    width: 120,
    height: 120,
    margin: 10,
  },
  horizontalScroll: {
    marginTop: 10,
  },
  scrollItem: {
    padding: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: '#000',
  },
});
