const config = require('../../app-services-config')
const { db } = require('../config/DbConfig')
const excel = require('../excel')
const utils = require('../utils')
const queries = require('../queries')
exports.Colaboradores = {
    async run() {
        // ler excel --- 
        // tratar os dados --- 
        // retornar no formato beneficiário ---
        // persistir no banco de dados o beneficiário ---
        // criar código de promoção para o beneficiário
        const colaboradores = executarPlanilha()
        const results = []
        for (const colaborador of colaboradores) {
            const cql = queries.colaboradores.create(colaborador)
            const result = await db.execute(cql)
            // colocar log de resultado
            results.push(result)
        }

        return results

    }

}

const executarPlanilha = () => {
    const path = config.configs.path_planilha.usuario
    const sheet = excel.colaboradores.read(path)
    const dados = sheet[Object.keys(sheet)[0]]
    const dadosTratados = dados.map(x => {
        return {
            ...x,
            email: x.email || '',
            token: utils.gerarToken(),
            tipo: 'Colaborador',
        }
    })
    return dadosTratados
}