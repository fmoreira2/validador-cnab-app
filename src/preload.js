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

const Rem_400_bradesco = require("./models/rem_400_bradesco.js");
let {
  bradesco_setNomeArquivo,
  bradesco_analisarHeader,
  bradesco_analisarBody,
  bradesco_analisarTrailler,
  bradesco_getCnabAnalisado,
  bradesco_setNovoCnab,
} = Rem_400_bradesco;

const Rem_400_paulista = require("./models/rem_400_paulista.js");
let {
  paulista_setNomeArquivo,
  paulista_analisarHeader,
  paulista_analisarBody,
  paulista_analisarTrailler,
  paulista_getCnabAnalisado,
  paulista_setNovoCnab,
} = Rem_400_paulista;

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

contextBridge.exposeInMainWorld("Rem_400_bradesco", {
  nomeArquivo: (nomeArquivo) => bradesco_setNomeArquivo(nomeArquivo),
  header: (index, line) => bradesco_analisarHeader(index, line),
  body: (index, line) => bradesco_analisarBody(index, line),
  trailler: (index, line) => bradesco_analisarTrailler(index, line),
  arquivo: () => bradesco_getCnabAnalisado(),
  novoCnab: () => bradesco_setNovoCnab(),
});

contextBridge.exposeInMainWorld("Rem_400_paulista", {
  nomeArquivo: (nomeArquivo) => paulista_setNomeArquivo(nomeArquivo),
  header: (index, line) => paulista_analisarHeader(index, line),
  body: (index, line) => paulista_analisarBody(index, line),
  trailler: (index, line) => paulista_analisarTrailler(index, line),
  arquivo: () => paulista_getCnabAnalisado(),
  novoCnab: () => paulista_setNovoCnab(),
});

contextBridge.exposeInMainWorld("Exportar", {
  createRelatorioWindow: () => createRelatorioWindow(),
  createObjWindow: () => createObjWindow(),
  limparCache: () => limparCache(),
});

function createRelatorioWindow(abc) {
  ipcRenderer.send("relModal");
}

function createObjWindow(abc) {
  ipcRenderer.send("objModal");
}


function limparCache() {
  ipcRenderer.send("limparCache");
}
