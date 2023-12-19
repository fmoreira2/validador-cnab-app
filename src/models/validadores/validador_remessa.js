exports.verificaQtdLinhas = function (valor) {
  //verifica a quantidade de caracteres da linha
  if (line.length != 400) {
    if (line.length != 444) {
      _header.erros.push({
        descricao: `Linha ${index} - Quantidade de caracteres inválida! ${line.length}`,
      });
    }
  }
};
