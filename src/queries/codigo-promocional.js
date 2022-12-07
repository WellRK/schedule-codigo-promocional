exports.codigoPromocional = {

    create (codigoPromocional, idBeneficiario){
        const params = {
            codigoPromocional: codigoPromocional.toString().toUpperCase(),
            idBeneficiario: parseInt(idBeneficiario)
        } 
        const cypher = `
        MATCH (beneficiario:Beneficiario)
        WHERE id(beneficiario) = $idBeneficiario
        CREATE (promo:Promocao {codigoPromocional: $codigoPromocional, created_at: timestamp()})
        WITH beneficiario, promo
        CREATE (beneficiario)<-[rel:CODIGO]-(promo)
        RETURN count(rel) as created
        `
        return { cypher, params };

    },

    listAllActive(){
        const params = {
            
        }
        const cypher = `
        MATCH (n:Beneficiario {situacaoBeneficiario : 'ativo'})
        OPTIONAL MATCH (n)--(p:Promocao)
        WITH n WHERE p is null
        RETURN collect(distinct id(n)) AS beneficiarios
        `
        return { cypher, params };
    },
    
    listAllCorretor(){
        const params = {
            
        }
        const cypher = `
        MATCH (n:Beneficiario {tipo : 'Corretor'})
        OPTIONAL MATCH (n)--(p:Promocao)
        WITH n WHERE p is null
        RETURN collect(distinct id(n)) AS beneficiarios
        `
        return { cypher, params };
    }

    
}