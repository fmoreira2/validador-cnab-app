//const fs = require("fs");
//import * as fs from "node:fs";
const form = document.querySelector("#img-form");
const cnab = document.querySelector("#cnab");
const filename = document.querySelector("#filename");
const lbQtdLinhas = document.querySelector("#lbQtdLinhas");
const heightInput = document.querySelector("#height");
const widthInput = document.querySelector("#width");

// mudar tema
function toggleMode() {
  const html = document.documentElement;
  html.classList.toggle("light");
}

// carregar arquivo e processar
function loadFile(e) {
  const file = e.target.files[0];

  // Check if file is an text
  // if (!isFileTxt(file)) {
  //   alertError("Por favor selecione um arquivo de Cnab");
  //   return;
  // }

  limpaBarCnab();
  filename.innerHTML = cnab.files[0].path;
  //verificar qtd linhas
  readFile(cnab.files[0]);
}
// Make sure file is an text
function isFileTxt(file) {
  const acceptedImageTypes = ["txt", "rem", "ret"];
  return file && acceptedImageTypes.includes(file["type"]);
}

//ler arquivo
function readFile(file) {
  const reader = new FileReader();
  let total = 0;
  reader.readAsText(file);
  reader.onload = function () {
    let result = reader.result;
    total = result.split("\n").length;
    console.log("total:", total);
    lbQtdLinhas.innerHTML = total.toString();
  };
  return total;
}

//exemplo de como percorrer no progress bar
function move() {
  var i = 0;
  let total = +lbQtdLinhas.innerHTML;
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("BarCnab");

    var width = 1;

    var id = setInterval(frame, 1);
    function frame() {
      if (width >= total) {
        console.log("finalizou progress bar");
        alertSuccess("Arquivo analisado com sucesso!");
        clearInterval(id);
        i = 0;
        
      } else {
        width++;
        elem.style.width = (width / total) * 100 + "%";
        elem.innerHTML = width;
        console.log(`width ${width}`);
      }
    }
  }
}

function limpaBarCnab() {
  var elem = document.getElementById("BarCnab");
  elem.style.width = "0%";
  elem.innerHTML = "";

  //teste
  //classList.toggle("light");
  // var btnRel = document.getElementsByName("BarCnab");
  // btnRel.classList("btnDisabled");
}

function alertSuccess(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "green",
      color: "white",
      textAlign: "center",
    },
  });
}

function alertError(message) {
  Toastify.toast({
    text: message,
    duration: 5000,
    close: false,
    style: {
      background: "red",
      color: "white",
      textAlign: "center",
    },
  });
}

// File select listener
cnab.addEventListener("change", loadFile);
