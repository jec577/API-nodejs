import { DataSource } from "typeorm";
import dotEnv from 'dotenv';
import { User } from "../models/user";

dotEnv.config();
const port = process.env.DB_PORT as number | undefined;

const migrationsPath = `${__dirname}/../migrations/*.{ts,js}`;

export const appDataSource = new DataSource({
    type:'postgres',
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: port,
    entities:[User],
    migrations:[migrationsPath]
});

export const initializeDatabase = async () => {
    try {
        await appDataSource.initialize();
        console.log('Conexão com o banco de dados estabelecida com sucesso')
    } catch (error) {
        console.log('Erro durante inicialização do banco de dados:', error);
        throw error;
    }
}

