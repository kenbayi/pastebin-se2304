import { downloadFromCloud } from "../controller/cloud-management/cloudDownload";
import { uploadToCloud } from "../controller/cloud-management/cloudUpload";

export interface CloudStorageAdapter {
    upload(content: string, title: string): Promise<string>;
    download(fileContent: string | undefined):Promise<string>;
}

export class GoogleCloudStorageAdapter implements CloudStorageAdapter {
    async upload(content: string, title: string): Promise<string> {
        return await uploadToCloud(content, title);
    }
    async download(fileContent: string): Promise<string>{
        return await downloadFromCloud(fileContent);
    }
}
