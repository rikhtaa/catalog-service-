import winston from "winston";

const logger = winston.createLogger({
    level: "info",
    defaultMeta: {
        serviceName: "catalog-service",
    },
    transports: [
        new winston.transports.File({
            level: "info",
            dirname: "logs",
            filename: "combined.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            // silent: config.NODE_ENV === 'test',
        }),
        new winston.transports.File({
            level: "error",
            dirname: "logs",
            filename: "errors.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            // silent: config.NODE_ENV === 'test',
        }),
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
            ),
            // silent: Config.NODE_ENV === 'test',
        }),
    ],
});

export default logger;
