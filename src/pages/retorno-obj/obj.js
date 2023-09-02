const retornoObj = document.querySelector("#retornoObj");
var cnab = {};

function recuperarCnab() {
  //get localstorage
  //cnab = JSON.parse(localStorage.getItem("cnab"));
  cnab = localStorage.getItem("cnab");
  //console.log(cnab);
  //retornoObj.innerHTML = JSON.stringify(cnab);

  //exibir json formatada e identado no html

  //Converte o JSON para uma string formatada
  //var formattedJSON = JSON.stringify(JSON.parse(cnab), null, 2);
  var formattedJSON = JSON.parse(JSON.stringify(cnab, null, 2));

  // Obtém o elemento <pre> onde iremos exibir o JSON formatado
  var jsonDisplay = document.getElementById("jsonDisplay");
  // Define o conteúdo do elemento <pre> como o JSON formatado
  jsonDisplay.textContent = formattedJSON;

  console.log(cnab);
}

window.onload = function () {
  // recuperar cnab
  recuperarCnab();
};
