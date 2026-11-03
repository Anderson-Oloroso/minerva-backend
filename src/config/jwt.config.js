import './env.config.js';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret || jwtSecret.trim().length < 32) {
    throw new Error('JWT_SECRET must be configured with at least 32 characters.');
}

export default jwtSecret;
