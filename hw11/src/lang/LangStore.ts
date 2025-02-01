import { makeAutoObservable } from 'mobx';
import LangService from './LangService';
import { LangType } from './LangType';

export default class LangStore {
    private langService: LangService;
    public currentLang: string = LangType.RU;

    constructor() {
        this.langService = new LangService();
        makeAutoObservable(this);
        this.initLang();
    }

    private initLang = async (): Promise<void> => {
        const lang = await this.langService.getLang();
        if (lang) {
            this.currentLang = lang;
            await this.langService.changeLang(lang);
        }
    };

    changeLang = async (lang: string): Promise<void> => {
        this.currentLang = lang;
        await this.langService.changeLang(lang);
    };
}
