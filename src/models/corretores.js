const config = require('../../app-services-config')
const { db, dbVendas } = require('../config/DbConfig')
const utils = require('../utils')
const queries = require('../queries')

exports.Corretores = {
    async run () {
        const corretores = await getCorretores()
        const results = []
        
        for (const corretor of corretores) {
            //constCodigoPromocional = utils.gerarCodigoPromocional()
            const cql = queries.corretores.create(corretor) // configurar Cypher
            const result = await db.execute(cql)
            results.push(result)         
        }
        return results
    }
}

async function getCorretores() {
    // executar query  
    const cql = queries.corretores.listCorretores()
    const resultado = await dbVendas.execute(cql)
    const dadosTratados = resultado.map(({ c, cont }) => {
        const { nome, cpf } = c
        return {
            nome,
            cpf,
            email: cont.email,
            token: utils.gerarToken(),
            tipo: 'Corretor',
        }
    })
    return dadosTratados

    
}

// const dadosTratados = resultado.map(x => {
    //     return {
    //         ...x,
    //         email: x.email || '',
    //         token: utils.gerarToken(),
    //         tipo: 'Corretor',
    //     }
    // })
    // return dadosTratados