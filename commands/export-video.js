import YTDlpWrapModule from 'yt-dlp-wrap';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { AttachmentBuilder } from 'discord.js';

const YTDlpWrap = YTDlpWrapModule.default;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isDocker = process.platform === 'linux';
const exePath = isDocker ? 'yt-dlp' : path.resolve(__dirname, '..', 'yt-dlp.exe');
const ytDlpWrap = new YTDlpWrap(exePath);

// Define a unified temporary folder path at the project root level
const tempDir = path.resolve(__dirname, '..', 'temp');

export async function extractVideoLink(interaction) {
    try {
        await interaction.deferReply();
    } catch (deferError) {
        console.error('⚠️ Failed to defer interaction:', deferError.message);
        return;
    }

    // Ensure the temp directory exists before starting any download stream
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }

    const targetUrl = interaction.options.getString('url');
    const timestamp = Date.now();

    // Save files directly into the isolated temp folder
    const tempFilename = `video_${timestamp}.mp4`;
    const tempFilePath = path.join(tempDir, tempFilename);

    try {
        console.log(`Fetching metadata cleanly using raw execution...`);

        let stdout = await ytDlpWrap.execPromise([
            targetUrl,
            '--dump-json',
            '--no-warnings'
        ]);

        let videoData = JSON.parse(stdout);
        const extractedTitle = videoData.title || 'Letöltött Videó';

        console.log(`Title allocated: "${extractedTitle}". Downloading to temp directory...`);

        await ytDlpWrap.execPromise([
            targetUrl,
            '-o', tempFilePath,
            '-f', 'bv+ba/b',
            '--remux-video', 'mp4',
            '--no-warnings'
        ]);

        if (!fs.existsSync(tempFilePath)) {
            throw new Error('Downloaded file was not created on disk.');
        }

        const stats = fs.statSync(tempFilePath);
        const fileSizeInMB = stats.size / (1024 * 1024);
        console.log(`Download finished. File size: ${fileSizeInMB.toFixed(2)} MB`);

        if (fileSizeInMB > 25) {
            return await interaction.editReply({
                content: '❌ A videó mérete meghaladja a Discord feltöltési korlátját (25MB).'
            });
        }

        const videoAttachment = new AttachmentBuilder(tempFilePath, { name: 'video.mp4' });

        await interaction.editReply({
            content: `🎬 **${extractedTitle}**`,
            files: [videoAttachment]
        });

        console.log(`Video file successfully delivered.`);

    } catch (error) {
        console.error('--- EXTRACTION CORE FAILURE ---');
        console.error(error.stderr || error);
        console.error('--------------------------------');

        try {
            await interaction.editReply({ content: '❌ Hiba történt a videó letöltése során.' });
        } catch (msgError) {
            console.error('Could not send error response:', msgError.message);
        }

    } finally {
        // --- COMPREHENSIVE TEMP PURGE ---
        // Loops through the temp folder and deletes EVERYTHING inside it,
        // ensuring no fragmented video or audio files are left behind.
        try {
            if (fs.existsSync(tempDir)) {
                const files = fs.readdirSync(tempDir);
                for (const file of files) {
                    const fileToDelete = path.join(tempDir, file);
                    fs.unlinkSync(fileToDelete);
                    console.log(`🧹 Purged from temp sandbox: ${file}`);
                }
            }
        } catch (cleanupError) {
            console.error('Failed running absolute folder sweep:', cleanupError.message);
        }
    }
}