const { contextBridge, ipcRenderer } = require("electron");

const Toastify = require("toastify-js");
const Rem_400_bmp = require("./models/rem_400_bmp.js");
let {
  setNomeArquivo,
  analisarHeader,
  analisarBody,
  analisarTrailler,
  getCnabAnalisado,
  setNovoCnab,
} = Rem_400_bmp;
// const cnab = document.querySelector("#cnab");
// const filename = document.querySelector("#filename");
// const lbQtdLinhas = document.querySelector("#lbQtdLinhas");
// const radio_rem_400_bmp = document.querySelector("#radio_rem_400_bmp");
// const radio_rem_400_bradesco = document.querySelector(
//   "#radio_rem_400_bradesco"
// );
// const radio_rem_400_paulista = document.querySelector(
//   "#radio_rem_400_paulista"
// );

contextBridge.exposeInMainWorld("Toastify", {
  toast: (options) => Toastify(options).showToast(),
});

contextBridge.exposeInMainWorld("Rem_400_bmp", {
  nomeArquivo: (nomeArquivo) => setNomeArquivo(nomeArquivo),
  header: (index, line) => analisarHeader(index, line),
  body: (index, line) => analisarBody(index, line),
  trailler: (index, line) => analisarTrailler(index, line),
  arquivo: () => getCnabAnalisado(),
  novoCnab: () => setNovoCnab(),
});

contextBridge.exposeInMainWorld("Exportar", {
  createRelatorioWindow: () => createRelatorioWindow(),
});

function createRelatorioWindow(abc) {
  ipcRenderer.send("relModal");
}
