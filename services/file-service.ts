import * as FileSystem from 'expo-file-system';

class FileService {
	public async isFileExists(fileUri: string): Promise<boolean> {
		const fileInfo: any = await FileSystem.getInfoAsync(fileUri);

		return !!fileInfo.exists;
	}

	public async deleteFile(fileUri: string): Promise<void> {
		if (await this.isFileExists(fileUri)) {
			await FileSystem.deleteAsync(fileUri, { idempotent: true });
		}
	}
}

const fileService: FileService = new FileService();
export default fileService;
