import { makeAutoObservable } from 'mobx';
import ItemService from '../services/ItemService';

class ItemStore {
    items: any[] = [];
    isLoading: boolean = false;
    private itemService: ItemService;

    constructor() {
        this.itemService = new ItemService();
        makeAutoObservable(this);
    }

    getItems = async () => {
        this.isLoading = true;
        try {
            this.items = await this.itemService.getItems();
        } catch (error) {
            console.error('Failed to fetch items', error);
        } finally {
            this.isLoading = false;
        }
    };

    getLocalItems = async () => {
        this.items = await this.itemService.getLocalItems() || [];
    };

    saveItemsLocally = async () => {
        await this.itemService.saveItemsLocally(this.items);
    };

    deleteItem = async (id: string) => {
        this.items = this.items.filter(item => item.id !== id);
        await this.itemService.saveItemsLocally(this.items);
    };
}

export default new ItemStore();