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
  limparCache: () => limparCache(),
});

function createRelatorioWindow(abc) {
  ipcRenderer.send("relModal");
}

function limparCache() {
  ipcRenderer.send("limparCache");
};


