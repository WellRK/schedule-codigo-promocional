exports.colaboradores = {

    create(colaborador){
        const params = {
            ...colaborador
        }
        const cypher = `
        MERGE (b:Beneficiario {cpf: $cpf})
        ON MATCH SET 
            b.tipo = $tipo,
            b.nome = $nome,
            b.situacaoBeneficiario = $situacaoBeneficiario,
            b.email = $email,
            b.origemBeneficiario = $origemBeneficiario
        ON CREATE SET
            b.tipo = $tipo,
            b.nome = $nome,
            b.situacaoBeneficiario = $situacaoBeneficiario,
            b.email = $email,
            b.origemBeneficiario = $origemBeneficiario,
            b.token = $token,
            b.dataCriacao = timestamp()
        RETURN b
        `
        return { cypher, params };

    }
    
}