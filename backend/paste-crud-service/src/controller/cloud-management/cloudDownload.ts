import { Storage } from '@google-cloud/storage';

const storage = new Storage();
const bucketName = `${process.env.BUCKET_NAME}`;

// Function to get file content from Cloud Storage
export const downloadFromCloud = async (fileContent: string)=> {
    const fileName = fileContent.split('/').pop();;
    const filePath = `pastes/${fileName}`;
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(filePath);

    const [contents] = await file.download();
    return contents.toString('utf-8');
};