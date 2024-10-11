import express from 'express';
import dotEnv from 'dotenv';
import { initializeDatabase } from './config/database';
import { routes } from './routes';

dotEnv.config();
const app = express();
const port = process.env.PORT;

initializeDatabase().then(() => {
    app.use(express.json());
    app.use(routes);
    app.listen(port, ()=>{
        console.log(`A aplicação está em execução na porta: ${port}`)
    });
})

