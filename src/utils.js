function gerarToken() {
    return ('000000' + Math.floor((Math.random() * 999999) + 1).toString()).substr(-6)
}

function gerarCodigoPromocional(){
    let cpf = Math.floor((Math.random() * 999999) + 1)
    let aleatorio =  Math.floor((Math.random() * 999999) + 1)
    const codigoPromocional = 'Usuario-'+ aleatorio + '-' + cpf.toString().substring(0,5)
    return codigoPromocional
}

module.exports = {
    gerarToken,
    gerarCodigoPromocional
}