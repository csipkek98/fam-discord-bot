import YTDlpWrapModule from 'yt-dlp-wrap';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { AttachmentBuilder } from 'discord.js';

const YTDlpWrap = YTDlpWrapModule.default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- DYNAMIC PATH SELECTION ---
// If running inside Linux/Docker, use the global production binary path.
// Otherwise, on your Windows desktop, fall back to your local path folder.
const isDocker = process.platform === 'linux';
const exePath = isDocker
    ? 'yt-dlp'
    : path.resolve(__dirname, '..', 'yt-dlp.exe');

// Initialize the wrapper with the dynamically selected path configuration
const ytDlpWrap = new YTDlpWrap(exePath);

export async function extractVideoLink(interaction) {
    const targetUrl = interaction.options.getString('url');
    await interaction.deferReply();

    const tempFilename = `video_${Date.now()}.mp4`;
    const tempFilePath = path.resolve(__dirname, '..', tempFilename);

    try {
        console.log(`Fetching metadata first for title allocation...`);

        // 1. Grab the metadata object to isolate the title string
        let videoData = await ytDlpWrap.getVideoInfo([
            targetUrl,
            '--dump-json',
            '--no-warnings'
        ]);

        if (typeof videoData === 'string') {
            videoData = JSON.parse(videoData);
        }

        // Fallback to 'Letöltött Videó' if the platform doesn't provide a clean title
        const extractedTitle = videoData.title || 'Letöltött Videó';

        console.log(`Starting local video download to: ${tempFilePath}`);

        // 2. Download the video directly to disk
        await ytDlpWrap.execPromise([
            targetUrl,
            '-o', tempFilePath,
            '-f', 'b[ext=mp4]/b',
            '--no-warnings'
        ]);

        if (!fs.existsSync(tempFilePath)) {
            throw new Error('Downloaded file was not created on disk.');
        }

        const stats = fs.statSync(tempFilePath);
        const fileSizeInMB = stats.size / (1024 * 1024);
        console.log(`Download finished. File size: ${fileSizeInMB.toFixed(2)} MB`);

        if (fileSizeInMB > 25) {
            if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
            return await interaction.editReply({
                content: '❌ A videó mérete meghaladja a Discord feltöltési korlátját (10MB/25MB).'
            });
        }

        const videoAttachment = new AttachmentBuilder(tempFilePath, { name: 'video.mp4' });

        // 3. Drop the exact dynamic title string into the text content block
        await interaction.editReply({
            content: `🎬 **${extractedTitle}**`,
            files: [videoAttachment]
        });

        console.log(`Video file successfully delivered under title: "${extractedTitle}"`);

    } catch (error) {
        console.error('--- EXTRACTION CORE FAILURE ---');
        if (error.stderr) {
            console.error('yt-dlp output error:\n', error.stderr);
        } else {
            console.error('General error:', error);
        }
        console.error('--------------------------------');

        await interaction.editReply({ content: '❌ Hiba történt a videó letöltése vagy feldolgozása során.' });

    } finally {
        if (fs.existsSync(tempFilePath)) {
            try {
                fs.unlinkSync(tempFilePath);
                console.log(`Temporary storage wiped: ${tempFilePath}`);
            } catch (cleanupError) {
                console.error('Failed to purge temporary file from directory:', cleanupError.message);
            }
        }
    }
}