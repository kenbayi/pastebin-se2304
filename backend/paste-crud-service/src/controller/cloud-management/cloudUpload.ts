import { Storage } from '@google-cloud/storage';
import { Readable } from 'stream';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library

const bucketName = `${process.env.BUCKET_NAME}`;

const storage = new Storage();

export const uploadToCloud = async (content: string, title: string) => {
    const bucket = storage.bucket(bucketName);

    // Create a complex filename with timestamp, UUID, and sanitized title
    const timestamp = Date.now();
    const uniqueId = uuidv4();
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, '-'); // Replace non-alphanumeric characters with hyphens
    const fileName = `pastes/${timestamp}-${uniqueId}-${sanitizedTitle}.txt`;

    const file = bucket.file(fileName);
    const stream = Readable.from([content]);

    await new Promise((resolve, reject) => {
        stream
            .pipe(file.createWriteStream({ contentType: 'text/plain' }))
            .on('finish', () => resolve(null))
            .on('error', reject);
    });

    const url = `https://storage.googleapis.com/${bucketName}/${fileName}`;

    console.log("Uploaded File URL: ", url)
    return url;
};
