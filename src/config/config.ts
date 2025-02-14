import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
    baseUrl: process.env.BASE_URL || 'https://jsonplaceholder.typicode.com',
    timeout: parseInt(process.env.TIMEOUT || '10000', 10), // Default timeout 10 seconds
    logLevel: process.env.LOG_LEVEL || 'info'
};

export default config;
