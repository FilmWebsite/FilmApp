import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

export async function checkFileExists(): Promise<void> {
  try {
    await fs.access(filePath);
    // File exists, do nothing
  } catch {
    // File does not exist, throw an error
    throw new Error(`File not found: ${filePath}`);
  }
}

const fileName = '../service-key.json';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, fileName);
