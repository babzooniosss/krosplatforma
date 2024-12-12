import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalClient {
    get = async (tableName: string): Promise<any> => {
        const data = await AsyncStorage.getItem(tableName);
        return data ? JSON.parse(data) : null;
    };

    set = async (tableName: string, data: any): Promise<void> => {
        return AsyncStorage.setItem(tableName, JSON.stringify(data));
    };

    removeAll = async (tableName: string): Promise<void> => {
        return AsyncStorage.removeItem(tableName);
    };

    removeItem = async (key: string): Promise<void> => {
        return AsyncStorage.removeItem(key);
    };
}