import { makeAutoObservable } from 'mobx';
import ItemService from '../service/Service';

class ItemStore {
    items: any[] = [];
    completedItems: any[] = []; // Список завершённых задач
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

    // Новый метод для завершения задачи
    completeTask = async (id: string) => {
        const completedTask = this.items.find(item => item.id === id);
        if (completedTask) {
            this.completedItems.push(completedTask); // Добавляем задачу в завершённые
            this.deleteItem(id); // Удаляем задачу из списка активных
        }
    };
}

export default new ItemStore();