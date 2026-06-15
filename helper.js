import fs from 'fs';
import cron from 'node-cron';
import path from 'path';
import { fileURLToPath } from 'url';
import * as humble from './commands/humble.js'; // Fixed: Added relative path './'

// 1. THESE TWO LINES MUST COME FIRST
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. NOW YOU CAN USE __dirname SAFELY HERE
const configPath = path.join(__dirname, 'config.json');

export function loadConfig() {
    try {
        if (fs.existsSync(configPath)) {
            const rawData = fs.readFileSync(configPath, 'utf8');
            return JSON.parse(rawData);
        }
    } catch (error) {
        console.error('Error reading config.json, using defaults:', error);
    }
    // Fallback default structure if file reading fails
    return { trackedChannelId: process.env.DISCORD_CHANNEL_ID || "" };
}

// Helper function to save configuration safely to disk
export function saveConfig(configData) {
    try {
        fs.writeFileSync(configPath, JSON.stringify(configData, null, 2), 'utf8');
        console.log('Configuration written to disk permanently.');
    } catch (error) {
        console.error('Failed to write configuration to disk:', error);
    }
}