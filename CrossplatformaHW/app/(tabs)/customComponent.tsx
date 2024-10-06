import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const Box = ({ width, height, color, label }) => {
    return (
        <View style={[styles.box, { width, height, backgroundColor: color }]}>
            <Text style={styles.boxText}>{label}</Text>
        </View>
    );
};

export default function App() {
    const [boxes, setBoxes] = useState([]);
    const [selectedSize, setSelectedSize] = useState({ width: 100, height: 100 });
    const [selectedColor, setSelectedColor] = useState('green');

    const addBox = () => {
        setBoxes([
            ...boxes,
            { width: selectedSize.width, height: selectedSize.height, color: selectedColor, id: boxes.length.toString() },
        ]);
    };

    const handleSizeChange = (size) => {
        if (size === 'small') {
            setSelectedSize({ width: 50, height: 50 });
        } else if (size === 'medium') {
            setSelectedSize({ width: 100, height: 100 });
        } else if (size === 'large') {
            setSelectedSize({ width: 150, height: 150 });
        }
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={boxes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Box width={item.width} height={item.height} color={item.color} label={`Box ${parseInt(item.id) + 1}`} />
                )}
            />

            <Text style={styles.label}>Выберите размер:</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.sizeButton} onPress={() => handleSizeChange('small')}>
                    <Text>Маленький</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sizeButton} onPress={() => handleSizeChange('medium')}>
                    <Text>Средний</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sizeButton} onPress={() => handleSizeChange('large')}>
                    <Text>Большой</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.label}>Выберите цвет:</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.colorButton, { backgroundColor: 'green' }]} onPress={() => handleColorChange('green')}>
                    <Text style={styles.buttonText}>Зеленый</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.colorButton, { backgroundColor: 'white' }]} onPress={() => handleColorChange('white')}>
                    <Text style={[styles.buttonText, { color: 'black' }]}>Белый</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.colorButton, { backgroundColor: 'red' }]} onPress={() => handleColorChange('red')}>
                    <Text style={styles.buttonText}>Красный</Text>
                </TouchableOpacity>
            </View>

            <Button title="Добавить квадрат" onPress={addBox} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 10,
        borderColor: '#333',
        borderWidth: 1,
    },
    boxText: {
        fontSize: 16,
        color: '#333',
    },
    label: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    sizeButton: {
        backgroundColor: '#ddd',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    colorButton: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
