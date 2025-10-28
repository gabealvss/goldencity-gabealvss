/**
 * Structured Logging Utility
 * Provides consistent logging format for API responses
 */

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

class Logger {
    static formatTimestamp() {
        return new Date().toISOString();
    }

    static formatRequest(req) {
        return {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent') || 'Unknown'
        };
    }

    static formatResponse(res, responseTime) {
        return {
            statusCode: res.statusCode,
            responseTime: `${responseTime}ms`,
            contentLength: res.get('Content-Length') || '0'
        };
    }

    static logRequest(req, res, responseTime) {
        const timestamp = this.formatTimestamp();
        const request = this.formatRequest(req);
        const response = this.formatResponse(res, responseTime);
        
        const statusColor = res.statusCode >= 400 ? colors.red : 
                           res.statusCode >= 300 ? colors.yellow : colors.green;
        
        console.log(`${colors.cyan}[${timestamp}]${colors.reset} ${colors.bright}${request.method}${colors.reset} ${request.url}`);
        console.log(`${colors.blue}  Status:${colors.reset} ${statusColor}${response.statusCode}${colors.reset}`);
        console.log(`${colors.blue}  Response Time:${colors.reset} ${colors.white}${response.responseTime}${colors.reset}`);
        console.log(`${colors.blue}  IP:${colors.reset} ${colors.white}${request.ip}${colors.reset}`);
        console.log(`${colors.blue}  User-Agent:${colors.reset} ${colors.white}${request.userAgent}${colors.reset}`);
        console.log('─'.repeat(80));
    }

    static logError(error, req) {
        const timestamp = this.formatTimestamp();
        const request = this.formatRequest(req);
        
        console.log(`${colors.red}[${timestamp}] ERROR${colors.reset}`);
        console.log(`${colors.red}  Message:${colors.reset} ${error.message}`);
        console.log(`${colors.red}  Status Code:${colors.reset} ${error.statusCode || 500}`);
        console.log(`${colors.red}  Request:${colors.reset} ${request.method} ${request.url}`);
        console.log(`${colors.red}  Stack:${colors.reset} ${error.stack}`);
        console.log('─'.repeat(80));
    }

    static logApiCall(endpoint, method, data = null, result = null) {
        const timestamp = this.formatTimestamp();
        
        console.log(`${colors.magenta}[${timestamp}] API CALL${colors.reset}`);
        console.log(`${colors.magenta}  Endpoint:${colors.reset} ${colors.bright}${method} ${endpoint}${colors.reset}`);
        
        if (data) {
            console.log(`${colors.magenta}  Request Data:${colors.reset}`);
            console.log(JSON.stringify(data, null, 2));
        }
        
        if (result) {
            console.log(`${colors.magenta}  Response:${colors.reset}`);
            console.log(JSON.stringify(result, null, 2));
        }
        
        console.log('─'.repeat(80));
    }
}

module.exports = Logger;
