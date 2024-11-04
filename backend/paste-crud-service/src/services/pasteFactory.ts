import { CloudStorageAdapter, GoogleCloudStorageAdapter } from "./cloudServiceAdapter";

export class ServiceFactory {
    // Create and return an instance of a cloud storage adapter
    static createCloudStorageAdapter(): CloudStorageAdapter {
        return new GoogleCloudStorageAdapter();
    }
}

