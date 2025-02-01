import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LangLocalRepository {
    private tableName(): string {
        return 'lang';
    }

    get = async (): Promise<string | null> => {
        const data = await AsyncStorage.getItem(this.tableName());
        return data ? JSON.parse(data) : null;
    };

    set = async (data: string): Promise<void> => {
        await AsyncStorage.setItem(this.tableName(), JSON.stringify(data));
    };

    removeAll = async (): Promise<void> => {
        await AsyncStorage.removeItem(this.tableName());
    };
}
