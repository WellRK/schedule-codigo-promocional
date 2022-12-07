const config = require('../../app-services-config')
const { db } = require('../config/DbConfig')
const excel = require('../excel')
const utils = require('../utils')
const queries = require('../queries')

exports.CodigoPromocional = {
    async run() {
        // buscar os beneficiarios
        // percorrer os id dos beneficiarios
        // para cada beneficiario gerar o codigo promo
        // salvar no banco
        const beneficiarios = await getBeneficiariosSemCodigoPromocional()
        // const arrayBeneficiariosId = beneficiarios.result
        const results = []
        for (const idBeneficiario of beneficiarios) {
            // função que gera o código promo
            const codigoPromocional = utils.gerarCodigoPromocional()
            const cql = queries.codigoPromocional.create(codigoPromocional, idBeneficiario)
            const result = await db.execute(cql)
            // colocar log de resultado
            results.push(result)
        }
        return results

    }
}

async function getBeneficiariosSemCodigoPromocional() {
    // executar query  que busca todos os ids
    const cql = queries.codigoPromocional.listAllActive()
    const resultado = await db.execute(cql)
    const result = resultado[0].beneficiarios
    // verificar se colaborador tem código promo
    return result
}



