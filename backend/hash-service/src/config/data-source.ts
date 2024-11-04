import { DataSource } from "typeorm";
import'dotenv/config';

export const HashDataSource = new DataSource({
    name: 'hashdb',
    type: 'postgres',
    host: process.env.DB_HASH_HOST,
    port: parseInt(process.env.DB_HASH_PORT || '5432'),
    username: process.env.DB_HASH_USERNAME,
    password: process.env.DB_HASH_PASSWORD,
    database: process.env.DB_HASH_DATABASE,
    entities: ["src/entity/**/*.ts"],
    migrations: ["src/migrations/**/*.ts"], 
    synchronize: false,
    logging: true,
});
