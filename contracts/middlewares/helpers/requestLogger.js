const Logger = require("../../utils/logger");

/**
 * Request Logging Middleware
 * Logs all incoming requests with structured format
 */
const requestLogger = (req, res, next) => {
    const startTime = Date.now();
    
    // Override res.end to capture response time
    const originalEnd = res.end;
    res.end = function(...args) {
        const responseTime = Date.now() - startTime;
        Logger.logRequest(req, res, responseTime);
        originalEnd.apply(this, args);
    };
    
    next();
};

/**
 * Error Logging Middleware
 * Logs errors with structured format
 */
const errorLogger = (err, req, res, next) => {
    Logger.logError(err, req);
    next(err);
};

module.exports = {
    requestLogger,
    errorLogger
};
