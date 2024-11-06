// ItemRepository.js
import AxiosClient from './AxiosClient';

export default class ItemRepository {
    constructor() {
        this.apiClient = new AxiosClient();
    }

    getItems = () => {
        return this.apiClient.get({ url: '/posts' });
    };

    changeItem = (item) => {
        return this.apiClient.post({
            url: '/posts/1',
            data: item,
        });
    };
}
