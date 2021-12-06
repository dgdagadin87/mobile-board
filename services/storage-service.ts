import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlatformService from './platform-service';

const STORAGE_KEY: string = 'MOBILEBOARD';

class StorageService {

    private platform = PlatformService;
    private store: Storage = this.createStore();

    public async setData(key: string, data: any): Promise<void> {
        await this.store.save({ key: STORAGE_KEY + key, data, expires: null });
    }

    public async getData(key: string): Promise<any> {
        return this.store.load({ key: STORAGE_KEY + key });
    }

    public async removeData(key: string): Promise<void> {
        await this.store.remove({ key: STORAGE_KEY + key })
    }

    private createStore(): Storage {
        return new Storage({
            size: 1000000,
            storageBackend: this.getNativeStorage(),
            defaultExpires: null,
            enableCache: true,
            sync: {}
        });
    }

    private getNativeStorage(): any {
        return this.platform.isWeb ? (<any>window).localStorage : AsyncStorage;
    }

}

const storageService: StorageService = new StorageService();
export default storageService;
