const excelToJson = require('convert-excel-to-json')

exports.colaboradores = {
    read(path) {
        const excelData = excelToJson({
            sourceFile: path,
            columnToKey: {
                "A": "cpf",
                "B": "matricula",
                "C": "nome",
                "D": "email",
                "E": "origemBeneficiario",
                "J": "situacaoBeneficiario"
            },
            header:{
                rows: 1
            }
        })
        return excelData
    }
}