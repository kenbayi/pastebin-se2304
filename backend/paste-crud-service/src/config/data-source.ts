import { DataSource } from "typeorm";
import'dotenv/config';

export const MetadataDataSource = new DataSource({
    name: 'metadb',
    type: 'postgres',
    host: process.env.DB_METADATA_HOST,
    port: parseInt(process.env.DB_METADATA_PORT || '5432'),
    username: process.env.DB_METADATA_USERNAME,
    password: process.env.DB_METADATA_PASSWORD,
    database: process.env.DB_METADATA_DATABASE,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    synchronize: false, 
    logging: true,
});