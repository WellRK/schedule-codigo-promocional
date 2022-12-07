exports.corretores = {

    create(corretor){
        const params = {
            ...corretor
        }
        const cypher = `
        MERGE (b:Beneficiario {cpf: $cpf})
        ON MATCH SET 
            b.tipo = $tipo,
            b.nome = $nome,
            b.email = $email
        ON CREATE SET
            b.tipo = $tipo,
            b.nome = $nome,
            b.email = $email,
            b.token = $token,
            b.cpf = $cpf,
            b.dataCriacao = timestamp()
        RETURN b
        `
        return { cypher, params };

    },    
    
    listCorretores(){
        const params = {
        }
        const cypher = `
        match(c:Corretor)--(cont:Contato)
        match(c)-[:PERTENCE]-(end:Endereco)
        WHERE c.ativo = true
        return c, c.ativo, cont, end 
        `
        return {cypher, params}
    }

}