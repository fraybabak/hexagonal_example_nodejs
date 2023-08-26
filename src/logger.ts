import pinoHttp from 'pino-http'
import pino from 'pino'
const logger = pino({
    level: 'info', // Log level
    transport: {
        target: 'pino-pretty',

        options: {
            colorize: true,
            ignore: 'pid,hostname,res,req',
            timestampKey: 'time',
            levelFirst: true,
            messageFormat: true,
            customColors: 'err:red,info:blue',


        }
    }
});
export const httpLogger = pinoHttp({
    logger: logger,
    formatters: {
        level(label, number) {
            return { level: label }
        },
    }
});