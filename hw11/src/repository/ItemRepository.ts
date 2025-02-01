import AxiosClient from '../api/AxiosClient';
import LocalClient from '../utils/LocalClient';

export default class ItemRepository {
    private apiClient: AxiosClient;
    private localClient: LocalClient;
    private tableName: string;

    constructor(tableName: string) {
        this.apiClient = new AxiosClient();
        this.localClient = new LocalClient();
        this.tableName = tableName;
    }

    getItems = () => {
        return this.apiClient.get('/posts');
    };

    getLocalItems = () => {
        return this.localClient.get(this.tableName);
    };

    setLocalItems = (data: any) => {
        return this.localClient.set(this.tableName, data);
    };

    removeLocalItem = (key: string) => {
        return this.localClient.removeItem(key);
    };
}
