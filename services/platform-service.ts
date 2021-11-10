import { Platform } from 'react-native';

class PlatformService {

    public get isWeb(): boolean {
        return Platform.OS === 'web';
    }

}

const platformService: PlatformService = new PlatformService();
export default platformService;
