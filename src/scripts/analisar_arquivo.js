const cnab = document.querySelector("#cnab");
const relatorio = document.getElementById("relatorio");
const filename = document.querySelector("#filename");
const lbQtdLinhas = document.querySelector("#lbQtdLinhas");
const vMulta = document.querySelector("#vMulta");
const vJuros = document.querySelector("#vJuros");
const radio_rem_400_bmp = document.querySelector("#radio_rem_400_bmp");
const radio_rem_400_bradesco = document.querySelector(
  "#radio_rem_400_bradesco"
);
const radio_rem_400_paulista = document.querySelector(
  "#radio_rem_400_paulista"
);

// File select listener
cnab.addEventListener("change", loadFile);

vMulta.addEventListener("change", () => {
  localStorage.setItem("vMulta", JSON.stringify(vMulta.value));
  limparParametros();
});

vJuros.addEventListener("change", () => {
  localStorage.setItem("vJuros", JSON.stringify(vJuros.value));
  limparParametros();
});

function limparParametros() {
  localStorage.setItem("cnab", JSON.stringify([]));
  Rem_400_bmp.novoCnab();
}

///TODO: refatorar código func loadFile
///TODO: Função deverá identificar o tipo de arquivo cnab
// carregar arquivo e processar
function loadFile(e) {
  const file = e.target.files[0];
  Rem_400_bmp.novoCnab();
  console.log(Rem_400_bmp);
  limpaBarCnab();
  filename.innerHTML = cnab.files[0].path;
  //verificar qtd linhas
  readFile(cnab.files[0]);
}

//ler arquivo, retorna total de linhas
function readFile(file) {
  const reader = new FileReader();
  let total = 0;
  reader.readAsText(file);
  reader.onload = function () {
    let result = reader.result;
    total = result.split("\n").length;
    lbQtdLinhas.innerHTML = total.toString();
  };
  limpaBarCnab();
  return total;
}

function limpaBarCnab() {
  var elem = document.getElementById("BarCnab");
  elem.style.width = "0%";
  elem.innerHTML = "";
}

///TODO: refatorar código func analisarCnab
///TODO: Função deverá identificar o tipo de arquivo cnab
//analisar arquivo cnab
function analisarCnab() {
  //limpar cache
  Exportar.limparCache();
  //verifica se arquivo foi selecionado
  if (cnab.files[0] == undefined) {
    alertError("Selecione um arquivo!");
    return;
  }
  Rem_400_bmp.nomeArquivo(cnab.files[0].name);
  var i = 0;
  let total = +lbQtdLinhas.innerHTML;
  //arquivo
  const reader = new FileReader();
  reader.readAsText(cnab.files[0]);
  reader.onload = function () {
    let result = reader.result;
    let lines = result.split(/[\r\n]+/g);

    if (i == 0) {
      var elem = document.getElementById("BarCnab");
      var id = setInterval(frame, 1);
      function frame() {
        if (i >= total) {
          alertSuccess("Arquivo analisado com sucesso!");
          clearInterval(id);
          console.log(Rem_400_bmp.arquivo());
          //localstorage
          localStorage.setItem("cnab", JSON.stringify(Rem_400_bmp.arquivo()));
          //abri janela relatorio
          Exportar.createRelatorioWindow();
          i = 0;
        } else {
          if (radio_rem_400_bmp.checked) {
            try {
              var identRegistro = lines[i].substring(0, 1);
            } catch {}

            if (identRegistro == "0") {
              Rem_400_bmp.header(i + 1, lines[i]);
            } else if (identRegistro == "1") {
              Rem_400_bmp.body(i + 1, lines[i]);
            } else if (identRegistro == "9") {
              Rem_400_bmp.trailler(i + 1, lines[i]);
            } else if (
              identRegistro == "" ||
              identRegistro == undefined ||
              identRegistro == null
            ) {
              alertError(
                `Linha ${i + 1} inválida, identificador: nulo ou vazio`
              );
            } else {
              alertError(
                `Linha ${i + 1} inválida, identificador: ${identRegistro}`
              );
              //adicionar linha inválida ao log
              Rem_400_bmp.body(i + 1, lines[i]);
            }
          } else if (radio_rem_400_bradesco.checked) {
            console.log("radio_rem_400_bradesco");
          } else if (radio_rem_400_paulista.checked) {
            console.log("radio_rem_400_paulista");
          } else {
            alertError("Selecione um layout!");
            return;
          }
          elem.style.width = ((i + 1) / total) * 100 + "%";
          elem.innerHTML = i + 1;
          i++;
        }
      }
    }
  };
}
