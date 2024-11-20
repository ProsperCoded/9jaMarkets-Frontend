export interface IUploadService {
    uploadFile(file: Express.Multer.File): Promise<string>;
    deleteFile(file: string): Promise<boolean>;
}