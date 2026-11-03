export class LoggerMiddleware {
    static formatLog(timestamp, method, url, status, duration) {
        return `${timestamp} - Method: ${method} Url: ${url} Status: ${status} Duration: ${duration} ms`;
    }

    static handle(req, res, next) {
        const startedAt = Date.now();
        const url = req.originalUrl || req.url;
        let logged = false;

        const logRequest = (status) => {
            if (logged) return;
            logged = true;

            const timestamp = new Date().toISOString();
            const duration = Date.now() - startedAt;
            console.log(LoggerMiddleware.formatLog(timestamp, req.method, url, status, duration));
        };

        res.once('finish', () => logRequest(res.statusCode));
        res.once('close', () => {
            if (!res.writableFinished) logRequest('aborted');
        });

        next();
    }
}

export const logger = LoggerMiddleware.handle;
export default LoggerMiddleware;
