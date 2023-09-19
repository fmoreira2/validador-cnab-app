const nomeArquivo = document.querySelector("#nomeArquivo");
const nomeBanco = document.querySelector("#nomeBanco");
const nomeEmpresa = document.querySelector("#nomeEmpresa");
const dataAnalise = document.querySelector("#dataAnalise");
var cnab = {};

function recuperarDados() {
  //get localstorage
  cnab = JSON.parse(localStorage.getItem("cnab"));
  console.log(cnab);
}

window.onload = function () {
  // recuperar dados
  recuperarDados();
  //carregar dados
  carregarDados();
};

function carregarDados() {
  //nome do arquivo
  nomeArquivo.innerHTML = cnab.nomeArquivo;
  //nome do banco
  nomeBanco.innerHTML = cnab.header[0].nomeBanco;
  //nome da empresa
  nomeEmpresa.innerHTML = cnab.header[0].nomeEmpresa;
  //data da analise
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  dataAnalise.innerHTML = today.toLocaleString();

  //loop para carregar erros header cnab
  if(cnab.header[0].erros.length > 0){
    for (let i = 0; i < cnab.header.length; i++) {
      for (let j = 0; j < cnab.header[i].erros.length; j++) {
        //criar linha
        var tr = document.createElement("tr");
        //criar coluna
        var td = document.createElement("td");
        //criar texto
        var text = document.createTextNode(cnab.header[i].erros[j].descricao);
        //adicionar texto na coluna
        td.appendChild(text);
        //adicionar coluna na linha
        tr.appendChild(td);
        //adicionar linha na tabela
        document.querySelector("#tabelaHeader").appendChild(tr);
      }
    }
  }else{
    console.log("sem ajustes a serem realizados.");
    //criar linha
    var tr = document.createElement("tr");
    //criar coluna
    var td = document.createElement("td");
    //criar texto
    var text = document.createTextNode("sem ajustes a serem realizados.");
    //adicionar texto na coluna
    td.appendChild(text);
    //adicionar coluna na linha
    tr.appendChild(td);
    //adicionar linha na tabela
    document.querySelector("#tabelaHeader").appendChild(tr);
  }

  //verificar se existe erros no body
  if (cnab.body[0].erros.length > 0) {
    //loop para carregar erros body cnab
    for (let i = 0; i < cnab.body.length; i++) {
      for (let j = 0; j < cnab.body[i].erros.length; j++) {
        //criar linha
        var tr = document.createElement("tr");
        //criar coluna
        var td = document.createElement("td");
        //criar texto
        var text = document.createTextNode(cnab.body[i].erros[j].descricao);
        //adicionar texto na coluna
        td.appendChild(text);
        //adicionar coluna na linha
        tr.appendChild(td);
        //adicionar linha na tabela
        document.querySelector("#tabelaBody").appendChild(tr);
      }
    }
  } else {
    console.log("sem ajustes a serem realizados.");
    //criar linha
    var tr = document.createElement("tr");
    //criar coluna
    var td = document.createElement("td");
    //criar texto
    var text = document.createTextNode("sem ajustes a serem realizados.");
    //adicionar texto na coluna
    td.appendChild(text);
    //adicionar coluna na linha
    tr.appendChild(td);
    //adicionar linha na tabela
    document.querySelector("#tabelaBody").appendChild(tr);
  }

  console.log("tamanho trailler errro: ", cnab.trailler[0].erros.length);
  //verficar se existe erros no trailler
  if (cnab.trailler[0].erros.length > 0) {
    //loop para carregar erros trailler cnab
    for (let i = 0; i < cnab.trailler.length; i++) {
      for (let j = 0; j < cnab.trailler[i].erros.length; j++) {
        //criar linha
        var tr = document.createElement("tr");
        //criar coluna
        var td = document.createElement("td");
        //criar texto
        var text = document.createTextNode(cnab.trailler[i].erros[j].descricao);
        //adicionar texto na coluna
        td.appendChild(text);
        //adicionar coluna na linha
        tr.appendChild(td);
        //adicionar linha na tabela
        document.querySelector("#tabelaTrailler").appendChild(tr);
      }
    }
  } else {
    console.log("sem ajustes a serem realizados.");
    //criar linha
    var tr = document.createElement("tr");
    //criar coluna
    var td = document.createElement("td");
    //criar texto
    var text = document.createTextNode("sem ajustes a serem realizados.");
    //adicionar texto na coluna
    td.appendChild(text);
    //adicionar coluna na linha
    tr.appendChild(td);
    //adicionar linha na tabela
    document.querySelector("#tabelaTrailler").appendChild(tr);
  }
}
