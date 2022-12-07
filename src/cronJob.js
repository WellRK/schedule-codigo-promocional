const model = require('./models')
const CronJob = require('cron').CronJob;

const createJob = function (cronTime, options, task) {
    let liberado = true
    let runOnInit = options.runOnInit

    const wrapperTask = async function () {
        try {
            if (liberado) {
                liberado = false

                logger.info('Iniciou execução');
                console.log('Iniciou execução');

                await task()

                logger.info('Finalizou execução');
                console.log('Finalizou execução');

                liberado = true
            }
        } catch (e) {
            logger.error(e);
            console.log(e);
            liberado = true
        }
    }

    return new CronJob(cronTime, wrapperTask, null, true, 'America/Sao_Paulo', null, runOnInit);
}

// Executa importação de colaboradores do excel para o banco
// exports.InitJobColaboradores = function () {
//     createJob('30 23 * * *', {  
//         nome: 'COLABORADORES',
//         runOnInit: true
//     }, async function () {
//         var retorno = await model.Colaboradores.run()
//         return retorno;
//     })
// }

// Gera código promo para colaboradores ativos
// Ver o melhor horário para executar a aplicação do código promo
// exports.InitJobGerarCodigoPromoColaboradores = function () {
//     createJob('30 23 * * *', {
//         nome: 'COLABORADORES ',
//         runOnInit: true
//     }, async function () {
//         var retorno = await model.CodigoPromocional.run()
//         return retorno;
//     })
// }

exports.InitJobCorretores = function () {
    createJob('30 23 * * *', {
        nome: 'COLABORADORES',
        runOnInit: true
    }, async function () {
        var retorno = await model.Corretores.run()
        return retorno;
    })
}

// exports.InitJobGerarCodigoPromoCorretores = function () {
//     createJob('30 23 * * *', {
//         nome: 'COLABORADORES ',
//         runOnInit: true
//     }, async function () {
//         var retorno = await model.CodigoPromocionalCorretor.run()
//         return retorno;
//     })
// }