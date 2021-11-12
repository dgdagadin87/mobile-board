import { Platform, Dimensions } from 'react-native';

class PlatformService {

    public get isWeb(): boolean {
        return Platform.OS === 'web';
    }

    public get width(): number {
        return Dimensions.get('window').width;
    }

}

const platformService: PlatformService = new PlatformService();
export default platformService;
