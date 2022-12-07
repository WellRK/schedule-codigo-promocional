const jobs = require('./src/cronJob')
const log = require('./src/config/LogConfig')
const fs = require('fs')

createLog();

async function createLog() {
    // await fs.readFile("app.log", "utf8", err => { });
    logger.info("Serviço iniciado!");

    //jobs.InitJobColaboradores();
    //jobs.InitJobGerarCodigoPromoColaboradores();
    jobs.InitJobCorretores();
  //  jobs.InitJobGerarCodigoPromoCorretores();
}