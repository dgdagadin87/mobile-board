import * as FileSystem from 'expo-file-system';

class FileService {
	async getFileContent(fileUri: string): Promise<string> {
		const fileInfo: any = await FileSystem.getInfoAsync(fileUri);

		if (!fileInfo.exists) {
			return '';
		}

		const fileContent: string = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });
		return fileContent;
	}
}

const fileService: FileService = new FileService();
export default fileService;
