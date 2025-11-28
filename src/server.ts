import 'dotenv/config';
import { createServer } from 'http';
import app from './app';
import initializeDatabase from './config/database';

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        await initializeDatabase();
        const server = createServer(app);
        server.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });

        server.on('error', (error) => {
            console.error('Error starting server:', error);
        });
    } catch (err) {
        console.error('Failed to initialize database or start server:', err);
        process.exit(1);
    }
};

start();