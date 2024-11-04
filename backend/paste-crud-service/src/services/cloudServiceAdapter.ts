import { uploadToCloud } from "../controller/cloud-management/cloudUpload";

export interface CloudStorageAdapter {
    upload(content: string, title: string): Promise<string>;
}

export class GoogleCloudStorageAdapter implements CloudStorageAdapter {
    async upload(content: string, title: string): Promise<string> {
        return await uploadToCloud(content, title);
    }
}
