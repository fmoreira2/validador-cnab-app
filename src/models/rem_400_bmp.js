//layout arquivo remessa 400 banco BMP
const Header = {
  //Posição 001 a 001
  identRegistro: "",
  //Posição 002 a 002
  identArquivoRemessa: "",
  //Posição 003 a 009
  literalRemessa: "",
  //Posição 010 a 011
  codServico: "",
  //Posição 012 a 026
  literalServico: "",
  //Posição 027 a 046
  codEmpresa: "",
  //Posição 047 a 076
  nomeEmpresa: "",
  //Posição 077 a 079
  numBancoBMP: "",
  //Posição 080 a 094
  nomeBanco: "",
  //Posição 095 a 100
  dataGravacao: "",
  //Posição 101 a 108
  branco_101_108: "",
  //Posição 109 a 110
  identSistema: "",
  //Posição 111 a 117
  numSeqRemessa: "",
  //Posição 118 a 394
  branco_118_394: "",
  //Posição 395 a 400
  numSeqRegistro: "",
  erros: [],
};
const Body = {
  //Posição 001 a 001
  identRegistro: "",
  //Posição 002 a 006
  agenDebito: "",
  //Posição 007 a 007
  digAgenDebito: "",
  //Posição 008 a 012
  razaoContaCorrente: "",
  //Posição 013 a 019
  contaCorrente: "",
  //Posição 020 a 020
  digContaCorrente: "",
  //Posição 021 a 037
  identEmpBeneficiaria: "",
  //Posição 038 a 052
  numControleParticipante: "",
  //Posição 053 a 062
  branco_53_62: "",
  //Posição 063 a 065
  codBancoDebitado: "",
  //Posição 066 a 066
  campoMulta: "",
  //Posição 067 a 070
  PercentualMulta: "",
  //Posição 071 a 081
  nossoNumero: "",
  //Posição 082 a 082
  digNossoNumero: "",
  //Posição 083 a 092
  descBonificacao: "",
  //Posição 093 a 093
  condEmissaoPapeleta: "",
  //Posição 094 a 094
  identBoletoDebito: "",
  //Posição 095 a 104
  identOperacaoBanco: "",
  //Posição 105 a 105
  indicadorRateioCredito: "",
  //Posição 106 a 106
  enderecamentoAvisoDebito: "",
  //Posição 107 a 108
  qtdPagamentos: "",
  //Posição 109 a 110
  identOcorrencia: "",
  //Posição 111 a 120
  numDocumento: "",
  //Posição 121 a 126
  dataVencimento: "",
  //Posição 127 a 139
  valorTitulo: "",
  //Posição 140 a 142
  numBancoCobranca: "",
  //Posição 143 a 147
  agenDepositaria: "",
  //Posição 148 a 149
  especieTitulo: "",
  //Posição 150 a 150
  identificacao: "",
  //Posição 151 a 156
  dataEmissao: "",
  //Posição 157 a 158
  codInstrucao1: "",
  //Posição 159 a 160
  codInstrucao2: "",
  //Posição 161 a 173
  valorJurosMora: "",
  //Posição 174 a 179
  dataLimiteDesconto: "",
  //Posição 180 a 192
  valorDesconto: "",
  //Posição 193 a 205
  valorIOF: "",
  //Posição 206 a 218
  valorAbatimento: "",
  //Posição 219 a 220
  identTipoIncricaoPagador: "",
  //Posição 221 a 234
  numInscricaoPagador: "",
  //Posição 235 a 274
  nomePagador: "",
  //Posição 275 a 314
  enderecoCompleto: "",
  //Posição 315 a 326
  primeiraMensagem: "",
  //Posição 327 a 331
  cep: "",
  //Posição 332 a 334
  sufixoCep: "",
  //Posição 335 a 394
  segundaMensagem: "",
  //Posição 395 a 400
  numSeqRegistro: "",
  erros: [],
};
const Trailler = {
  //Posição 001 a 001
  identRegistro: "",
  //Posição 002 a 394
  branco_2_394: "",
  //Posição 395 a 400
  numSeqRegistro: "",
  erros: [],
};
const Erros = {
  //descrição do erro
  descricao: "",
};

const layout = {
  nomeArquivo: "",
  header: [],
  body: [],
  trailler: [],
};

var rem_400_bmp = {};

exports.setNomeArquivo = function (nomeArquivo) {
  rem_400_bmp["nomeArquivo"] = nomeArquivo;
};

exports.analisarHeader = function (index, line) {
  let _header = null;
  _header = Object.create(Header);
  _header.erros = [];

  //verifica a quantidade de caracteres da linha
  if (line.length != 400) {
    if (line.length != 400) {
      _header.erros.push({
        descricao: `Linha ${index} - Quantidade de caracteres inválida!`,
      });
    }
  }
  _header.identRegistro = line.substring(0, 1);

  _header.identArquivoRemessa = line.substring(1, 2);
  if (_header.identArquivoRemessa != "1") {
    _header.erros.push({
      descricao: `Linha ${index} - 002 a 002 Identificação do arquivo remessa inválida!`,
    });
  }

  _header.literalRemessa = line.substring(2, 9);
  if (_header.literalRemessa.trim() != "REMESSA") {
    _header.erros.push({
      descricao: `Linha ${index} - 003 a 009 Literal remessa inválido!`,
    });
  }

  _header.codServico = line.substring(9, 11);
  if (_header.codServico != "01") {
    _header.erros.push({
      descricao: `Linha ${index} - 010 a 011 Código do serviço inválido!`,
    });
  }

  _header.literalServico = line.substring(11, 26);
  if (_header.literalServico.trim() != "COBRANCA") {
    _header.erros.push({
      descricao: `Linha ${index} - 012 a 026 Literal do serviço inválido!`,
    });
  }

  _header.codEmpresa = line.substring(27, 46);
  _header.nomeEmpresa = line.substring(46, 76);

  _header.numBancoBMP = line.substring(76, 79);
  if (_header.numBancoBMP.trim() != "274") {
    _header.erros.push({
      descricao: `Linha ${index} - 077 a 079 Número do banco inválido!`,
    });
  }

  _header.nomeBanco = line.substring(79, 94);
  if (_header.nomeBanco.trim() != "BMP MONEY PLUS") {
    _header.erros.push({
      descricao: `Linha ${index} - 080 a 094 Nome do banco inválido!`,
    });
  }

  _header.dataGravacao = line.substring(94, 100);
  if (
    _header.dataGravacao == "" ||
    _header.dataGravacao == null ||
    _header.dataGravacao == undefined ||
    _header.dataGravacao == "      "
  ) {
    _header.erros.push({
      descricao: `Linha ${index} - 095 a 100 Identificação do sistema inválido!`,
    });
  }

  _header.branco_101_108 = line.substring(100, 108);

  _header.identSistema = line.substring(108, 110);
  if (_header.identSistema != "MX") {
    _header.erros.push({
      descricao: `Linha ${index} - 109 a 110 Identificação do sistema inválido!`,
    });
  }

  _header.numSeqRemessa = line.substring(110, 117);
  if (
    _header.numSeqRemessa == "" ||
    _header.numSeqRemessa == "0000000" ||
    _header.numSeqRemessa == null ||
    _header.numSeqRemessa == undefined ||
    _header.numSeqRemessa == "      "
  ) {
    _header.erros.push({
      descricao: `Linha ${index} - 111 a 117 Número sequencial do remessa inválido!`,
    });
  }

  _header.branco_118_394 = line.substring(117, 394);

  _header.numSeqRegistro = line.substring(394, 400);
  if (
    _header.numSeqRemessa == "" ||
    _header.numSeqRemessa == "000000" ||
    _header.numSeqRemessa == null ||
    _header.numSeqRemessa == undefined ||
    _header.numSeqRemessa == "      "
  ) {
    _header.erros.push({
      descricao: `Linha ${index} - 111 a 117 Número sequencial do arquivo inválido!`,
    });
  }

  rem_400_bmp.header.push(_header);
};

exports.analisarBody = function (index, line) {
  let _body = null;
  _body = Object.create(Body);
  _body.erros = [];

  //verifica a quantidade de caracteres da linha
  if (line.length != 400) {
    _body.erros.push({
      descricao: `Linha ${index} - Quantidade de caracteres inválida!`,
    });
  }

  if (line.substring(0, 1) != "1") {
    _body.erros.push({
      descricao: `Linha ${index} - Identificação do registro inválida!`,
    });
    return;
  } else {
    _body.identRegistro = line.substring(0, 1);
    _body.agenDebito = line.substring(1, 6);

    _body.digAgenDebito = line.substring(6, 7);
    _body.razaoContaCorrente = line.substring(7, 12);
    _body.contaCorrente = line.substring(12, 19);
    _body.digContaCorrente = line.substring(19, 20);
    _body.identEmpBeneficiaria = line.substring(20, 37);
    _body.numControleParticipante = line.substring(37, 52);
    if (
      _body.numControleParticipante == "" ||
      _body.numControleParticipante == null ||
      _body.numControleParticipante == undefined ||
      _body.numControleParticipante == "               "
    ) {
      _body.erros.push({
        descricao: `Linha ${index} - 038 a 052 Número de controle do participante inválido!`,
      });
    }

    _body.branco_53_62 = line.substring(52, 62);
    _body.codBancoDebitado = line.substring(62, 65);
    _body.campoMulta = line.substring(65, 66);
    if (_body.campoMulta != "0" && _body.campoMulta != "2") {
      _body.erros.push({
        descricao: `Linha ${index} - 066 a 066 Campo multa inválido! - valor no arquivo: ${_body.campoMulta} `,
      });
    }

    if (_body.campoMulta == "2") {
      _body.PercentualMulta = line.substring(66, 70);
      if (
        _body.PercentualMulta == "" ||
        _body.PercentualMulta == null ||
        _body.PercentualMulta == undefined ||
        _body.PercentualMulta == "    "
      ) {
        _body.erros.push({
          descricao: `Linha ${index} - 067 a 070 Percentual multa inválido!`,
        });
      } else {
        try {
          var multa = parseFloat(_body.PercentualMulta) / 100;
          if (multa < 0 || multa > 100) {
            _body.erros.push({
              descricao: `Linha ${index} - 067 a 070 Percentual multa inválido!`,
            });
          } else {
            //get localstorage
            var vMulta = null;
            vMulta = JSON.parse(localStorage.getItem("vMulta"));
            if (vMulta > 0) {
              if (vMulta != multa) {
                _body.erros.push({
                  descricao: `Linha ${index} - 067 a 070 Percentual multa inválido! Valor da multa no arquivo: ${multa} - Valor da multa no sistema: ${vMulta}`,
                });
              }
            }
          }
        } catch (error) {
          _body.erros.push({
            descricao: `Linha ${index} - 067 a 070 Percentual multa inválido!`,
          });
        }
      }
    }

    //_body.PercentualMulta = line.substring(66, 70);
    _body.nossoNumero = line.substring(70, 81);
    if (
      _body.nossoNumero == "" ||
      _body.nossoNumero == null ||
      _body.nossoNumero == undefined ||
      _body.nossoNumero == "            "
    ) {
      _body.erros.push({
        descricao: `Linha ${index} - 071 a 081 Nosso número inválido!`,
      });
    }

    _body.digNossoNumero = line.substring(81, 82);
    if (
      _body.digNossoNumero == "" ||
      _body.digNossoNumero == null ||
      _body.digNossoNumero == undefined ||
      _body.digNossoNumero == " "
    ) {
      _body.erros.push({
        descricao: `Linha ${index} - 082 a 082 Dígito nosso número inválido!`,
      });
    }
    _body.descBonificacao = line.substring(82, 92);
    _body.condEmissaoPapeleta = line.substring(92, 93);
    if (_body.condEmissaoPapeleta != "2") {
      _body.erros.push({
        descricao: `Linha ${index} - 093 a 093 Condição para emissão da papeleta inválida!`,
      });
    }
    _body.identBoletoDebito = line.substring(93, 94);
    // if (_body.identBoletoDebito != "N") {
    //   _body.erros.push({
    //     descricao: `Linha ${index} - 094 a 094 Identificação do boleto de débito inválido!`,
    //   });
    // }
    _body.identOperacaoBanco = line.substring(94, 104);
    _body.indicadorRateioCredito = line.substring(104, 105);
    _body.enderecamentoAvisoDebito = line.substring(105, 106);
    _body.qtdPagamentos = line.substring(106, 108);
    _body.identOcorrencia = line.substring(108, 110);
    _body.numDocumento = line.substring(110, 120);
    if (
      _body.numDocumento == "" ||
      _body.numDocumento == null ||
      _body.numDocumento == undefined ||
      _body.numDocumento == "          "
    ) {
      _body.erros.push({
        descricao: `Linha ${index} - 111 a 120 Número do documento inválido!`,
      });
    }

    _body.dataVencimento = line.substring(120, 126);
    if (
      _body.dataVencimento == "" ||
      _body.dataVencimento == null ||
      _body.dataVencimento == undefined ||
      _body.dataVencimento == "      "
    ) {
      _body.erros.push({
        descricao: `Linha ${index} - 121 a 126 Data de vencimento inválida!`,
      });
    }
    _body.valorTitulo = line.substring(126, 139);
    if (
      _body.valorTitulo == "" ||
      _body.valorTitulo == null ||
      _body.valorTitulo == undefined ||
      _body.valorTitulo == "             "
    ) {
      _body.erros.push({
        descricao: `Linha ${index} - 127 a 139 Valor do título inválido!`,
      });
    } else {
      try {
        //colocar virgula antes dos dois últimos caracteres no valor do título
        var numVirgula = _body.valorTitulo.length - 2;
        _body.valorTitulo =
          _body.valorTitulo.substring(0, numVirgula) +
          "." +
          _body.valorTitulo.substring(numVirgula);

        //converte o valor do título para float
        var valorTitulo = parseFloat(_body.valorTitulo);
        //verifica se o valor do título é válido
        if (valorTitulo <= 0) {
          _body.erros.push({
            descricao: `Linha ${index} - 127 a 139 Valor do título inválido!`,
          });
        }
      } catch (error) {
        _body.erros.push({
          descricao: `Linha ${index} - 127 a 139 Valor do título inválido!`,
        });
      }
    }

    _body.numBancoCobranca = line.substring(139, 142);
    _body.agenDepositaria = line.substring(142, 147);
    _body.especieTitulo = line.substring(147, 149);
    if (
      _body.especieTitulo == "" ||
      _body.especieTitulo == null ||
      _body.especieTitulo == undefined ||
      _body.especieTitulo == "  "
    ) {
      _body.erros.push({
        descricao: `Linha ${index} - 148 a 149 Espécie do título inválida!`,
      });
    } else {
      //verifica se a espécie do título é válida
      if (
        _body.especieTitulo != "01" &&
        _body.especieTitulo != "02" &&
        _body.especieTitulo != "03" &&
        _body.especieTitulo != "04" &&
        _body.especieTitulo != "05" &&
        _body.especieTitulo != "06" &&
        _body.especieTitulo != "07" &&
        _body.especieTitulo != "08" &&
        _body.especieTitulo != "09" &&
        _body.especieTitulo != "10" &&
        _body.especieTitulo != "11" &&
        _body.especieTitulo != "12" &&
        _body.especieTitulo != "13" &&
        _body.especieTitulo != "14" &&
        _body.especieTitulo != "15" &&
        _body.especieTitulo != "16" &&
        _body.especieTitulo != "17" &&
        _body.especieTitulo != "18" &&
        _body.especieTitulo != "19" &&
        _body.especieTitulo != "20" &&
        _body.especieTitulo != "21" &&
        _body.especieTitulo != "22" &&
        _body.especieTitulo != "23" &&
        _body.especieTitulo != "24" &&
        _body.especieTitulo != "25" &&
        _body.especieTitulo != "26" &&
        _body.especieTitulo != "27" &&
        _body.especieTitulo != "28" &&
        _body.especieTitulo != "29" &&
        _body.especieTitulo != "30" &&
        _body.especieTitulo != "31" &&
        _body.especieTitulo != "32" &&
        _body.especieTitulo != "33" &&
        _body.especieTitulo != "34" &&
        _body.especieTitulo != "35" &&
        _body.especieTitulo != "36" &&
        _body.especieTitulo != "37" &&
        _body.especieTitulo != "38" &&
        _body.especieTitulo != "99"
      ) {
        _body.erros.push({
          descricao: `Linha ${index} - 148 a 149 Espécie do título inválido!`,
        });
      }
      _body.identificacao = line.substring(149, 150);
      _body.dataEmissao = line.substring(150, 156);
      if (
        _body.dataEmissao == "" ||
        _body.dataEmissao == null ||
        _body.dataEmissao == undefined ||
        _body.dataEmissao == "      "
      ) {
        _body.erros.push({
          descricao: `Linha ${index} - 151 a 156 Data de emissão inválida!`,
        });
      }
      _body.codInstrucao1 = line.substring(156, 158);
      _body.codInstrucao2 = line.substring(158, 160);
      _body.valorJurosMora = line.substring(160, 173);
      if (
        _body.valorJurosMora == "" ||
        _body.valorJurosMora == null ||
        _body.valorJurosMora == undefined ||
        _body.valorJurosMora == "             "
      ) {
        _body.erros.push({
          descricao: `Linha ${index} - 161 a 173 Valor do juros de mora inválido!`,
        });
      } else {
        try {
          var numVirgula = _body.valorJurosMora.length - 2;
          _body.valorJurosMora =
            _body.valorJurosMora.substring(0, numVirgula) +
            "." +
            _body.valorJurosMora.substring(numVirgula);

          //converte o valor do juros de mora para float
          var valorJurosMora = parseFloat(_body.valorJurosMora);
          //verifica se o valor do juros de mora é válido
          if (valorJurosMora < 0) {
            _body.erros.push({
              descricao: `Linha ${index} - 161 a 173 Valor do juros de mora inválido!`,
            });
          } else {
            //get localstorage
            var vJuros = null;
            vJuros = JSON.parse(localStorage.getItem("vJuros"));

            //calcular o valor de mora dia
            var valorMoraDiaCalculado = (vJuros / 30 / 100) * _body.valorTitulo;
            valorMoraDiaCalculado = valorMoraDiaCalculado.toFixed(2);
            if (valorMoraDiaCalculado != _body.percentualJurosMora) {
              _body.erros.push({
                descricao: `Linha ${index} - 161 a 173 Valor do juros de mora inválido! Valor do juros de mora no arquivo: 
                ${valorJurosMora} - Valor de mora no sistema: ${valorMoraDiaCalculado}`,
              });
            }
          }
        } catch (error) {
          _body.erros.push({
            descricao: `Linha ${index} - 161 a 173 Valor do juros de mora inválido!`,
          });
        }
      }

      _body.dataLimiteDesconto = line.substring(173, 179);
      _body.valorDesconto = line.substring(179, 192);
      _body.valorIOF = line.substring(192, 205);
      _body.valorAbatimento = line.substring(205, 218);
      _body.identTipoIncricaoPagador = line.substring(218, 220);
      if (
        _body.identTipoIncricaoPagador == "" ||
        _body.identTipoIncricaoPagador == null ||
        _body.identTipoIncricaoPagador == undefined ||
        _body.identTipoIncricaoPagador == "             "
      ) {
        _body.erros.push({
          descricao: `Linha ${index} - 219 a 220 Identificação do tipo de inscrição do pagador inválido!`,
        });
      } else if (
        _body.identTipoIncricaoPagador != "01" &&
        _body.identTipoIncricaoPagador != "02"
      ) {
        _body.erros.push({
          descricao: `Linha ${index} - 219 a 220 Identificação do tipo de inscrição do pagador inválido!`,
        });
      }

      _body.numInscricaoPagador = line.substring(220, 234);
      if (
        _body.numInscricaoPagador == "" ||
        _body.numInscricaoPagador == null ||
        _body.numInscricaoPagador == undefined ||
        _body.numInscricaoPagador == "               "
      ) {
        _body.erros.push({
          descricao: `Linha ${index} - 221 a 234 Número de inscrição do pagador inválido!`,
        });
      }

      _body.nomePagador = line.substring(234, 274);
      if (
        _body.nomePagador == "" ||
        _body.nomePagador == null ||
        _body.nomePagador == undefined ||
        _body.nomePagador ==
          "                                                  "
      ) {
        _body.erros.push({
          descricao: `Linha ${index} - 235 a 274 Nome do pagador inválido!`,
        });
      }
      _body.enderecoCompleto = line.substring(274, 314);
      if (
        _body.enderecoCompleto == "" ||
        _body.enderecoCompleto == null ||
        _body.enderecoCompleto == undefined ||
        _body.enderecoCompleto ==
          "                                                  "
      ) {
        _body.erros.push({
          descricao: `Linha ${index} - 275 a 314 Endereço completo do pagador inválido!`,
        });
      }
      _body.primeiraMensagem = line.substring(314, 326);
      _body.cep = line.substring(326, 331);
      if (
        _body.cep == "" ||
        _body.cep == null ||
        _body.cep == undefined ||
        _body.cep == "     "
      ) {
        _body.erros.push({
          descricao: `Linha ${index} - 327 a 331 CEP do pagador inválido!`,
        });
      }
      _body.sufixoCep = line.substring(331, 334);
      if (
        _body.sufixoCep == "" ||
        _body.sufixoCep == null ||
        _body.sufixoCep == undefined ||
        _body.sufixoCep == "   "
      ) {
        _body.erros.push({
          descricao: `Linha ${index} - 332 a 334 Sufixo do CEP do pagador inválido!`,
        });
      }
      _body.segundaMensagem = line.substring(334, 394);
      _body.numSeqRegistro = line.substring(394, 400);
      if (
        _body.numSeqRegistro == "" ||
        _body.numSeqRegistro == null ||
        _body.numSeqRegistro == undefined ||
        _body.numSeqRegistro == "      "
      ) {
        _body.erros.push({
          descricao: `Linha ${index} - 395 a 400 Número sequencial do registro inválido!`,
        });
      }

      rem_400_bmp.body.push(_body);
    }
  }
};

exports.analisarTrailler = function (index, line) {
  let i = index - 1;
  let _trailler = null;
  _trailler = Trailler;

  _trailler.identRegistro = line.substring(0, 1);
  _trailler.branco_2_394 = line.substring(1, 394);
  if (
    _trailler.branco_2_394 == "" ||
    _trailler.branco_2_394 == null ||
    _trailler.branco_2_394 == undefined
  ) {
    _trailler.erros.push({
      descricao: `Linha ${i} - 002 a 394 Brancos inválidos!`,
    });
  }
  _trailler.numSeqRegistro = line.substring(394, 400);
  if (
    _trailler.numSeqRegistro == "" ||
    _trailler.numSeqRegistro == null ||
    _trailler.numSeqRegistro == undefined ||
    _trailler.numSeqRegistro == "      "
  ) {
    _trailler.erros.push({
      descricao: `Linha ${i} - 395 a 400 Número sequencial do registro inválido!`,
    });
  }

  rem_400_bmp.trailler.push(_trailler);
};

exports.getCnabAnalisado = function () {
  return rem_400_bmp;
};

exports.setNovoCnab = function () {
  rem_400_bmp = Object.create(layout);
  rem_400_bmp.header = [];
  rem_400_bmp.body = [];
  rem_400_bmp.trailler = [];
  return rem_400_bmp;
};
