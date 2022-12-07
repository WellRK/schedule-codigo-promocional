const winston = require("winston")

const timezoned = () => {
    return new Date().toLocaleString('pt-br', {
        timeZone: 'America/Sao_Paulo'
    });
}

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timezoned()} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: "app.log" })
    ],
    format: combine(
        label({ label: "schedule"}),
        timestamp(),
        myFormat
    )
});
