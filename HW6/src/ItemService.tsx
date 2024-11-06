// ItemService.js
import ItemRepository from './ItemRepository';

export default class ItemService {
    constructor() {
        this.itemRepository = new ItemRepository();
    }

    getItems = async () => {
        const res = await this.itemRepository.getItems();
        return res.data.slice(0, 10); // Возвращаем только первые 10 записей
    };
}
