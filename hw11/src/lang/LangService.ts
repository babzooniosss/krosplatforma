import { Localization } from './LangAdapter';
import LangLocalRepository from './LangLocalRepository';
import { LangType } from './LangType';

export default class LangService {
    private langLocal: LangLocalRepository;

    constructor() {
        this.langLocal = new LangLocalRepository();
    }

    changeLang = async (lang: string): Promise<void> => {
        await this.langLocal.set(lang);
        await Localization.changeLanguage(lang); // i18next built-in method
    };

    getLang = async (): Promise<string | null> => {
        return await this.langLocal.get();
    };
}
