import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const prefixSegments = (process.env.API_PREFIX || '/api/v1').split('/').filter(Boolean);
export const apiPrefix = `/${prefixSegments.join('/')}`;
export const serverPort = Number(process.env.PORT) || 5000;
