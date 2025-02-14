import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Ensure the logs directory exists
const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// Define log file path
const logFilePath = path.join(logDir, 'api-automation.log');

const logger = winston.createLogger({
    level: 'debug',  // Change to 'debug' for detailed logs
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Logs to console
        new winston.transports.File({
            filename: logFilePath,
            level: 'debug',
            options: { flags: 'w' } // Overwrites file on each run (change to 'a' for append mode)
        })
    ],
});

// **Flush logs immediately after writing**
logger.on('finish', () => {
    console.log('🟢 Logger finished writing logs.');
});

logger.info('🚀 Logger initialized: api-automation.log should contain this line');

export default logger;