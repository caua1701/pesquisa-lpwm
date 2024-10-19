function ajax(cep) {
   // recupera o CEP que foi digitado pelo usuário

   // cria objeto XMLHttpRequest que servirá para controlar a comunicação
   // do navegador com o servidor (site do ViaBrasil)
   let xhttp = new XMLHttpRequest();

   // prepara o tratamento da resposta
   // deve ser feito antes de preparar e mandar a requisição
   xhttp.onreadystatechange = function () {
      // readState 4 = resposta recebida
      // status 200 = resposta OK
      console.log(this.readyState);
      if (this.readyState == 4 && this.status == 200) {
         let endereco = JSON.parse(this.responseText);
         document.getElementById("logradouro").value = endereco.logradouro;
         document.getElementById("complemento").value = endereco.complemento;
         document.getElementById("bairro").value = endereco.bairro;
         document.getElementById("localidade").value = endereco.localidade;
         document.getElementById("uf").value = endereco.uf;

         // o que ocorrerá se retirar o comentário da linha abaixo?
         //document.getElementById("demo").innerHTML = this.responseText;
      }
   };
   // prepara a solicitação
   xhttp.open("GET", "https://viacep.com.br/ws/" + cep + "/json", true);

   // envia a solicitação
   xhttp.send();
}

function fetchapi(cep) {
   fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
         document.getElementById("logradouro").value = data.logradouro;
         document.getElementById("complemento").value = data.complemento;
         document.getElementById("bairro").value = data.bairro;
         document.getElementById("localidade").value = data.localidade;
         document.getElementById("uf").value = data.uf;
      })
      .catch((error) => console.error("Erro:", error));
}

async function asyncawait(cep) {
   try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      document.getElementById("logradouro").value = data.logradouro;
      document.getElementById("complemento").value = data.complemento;
      document.getElementById("bairro").value = data.bairro;
      document.getElementById("localidade").value = data.localidade;
      document.getElementById("uf").value = data.uf;
   } catch (error) {
      console.error("Erro:", error);
   }
}

function verificar() {
   let cep = parseInt(document.getElementById("cep").value);

   const radio = document.getElementsByName("metodo");
   let radioSelected = "";

   for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
         radioSelected = radio[i].value;
         break;
      }
   }

   switch (radioSelected) {
      case "1":
         ajax(cep);
         break;
      case "2":
         fetchapi(cep);
         break;
      case "3":
         asyncawait(cep);
         break;
   }
}
