OrderingException.prototype = Object.create(Error.prototype);

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('files').addEventListener('change', loadFile, false);
});

function loadFile(e) {
  const input = e.target;
  try {
    var reader = new FileReader();
    reader.onload = function(){
      run(reader.result);
    };

    reader.readAsText(input.files[0]);
  } catch(e) {
    alert(e);
  }
}

function run(fileText){
  fileText = validateFile(fileText);
  fileText = parseFile(fileText)
  

  show(fileText)
}

function show(fileText) {
  let nomesAtributos;
  let todosOsLivros;
  let ordenacao;
  let livrosOrdenados;
  let html;
 

  if(fileText != "" && fileText != undefined){
    nomesAtributos = fileText[0];
    todosOsLivros  = fileText[1];
    ordenacao      = fileText[2];

    livrosOrdenados = servico_Ordenacao(todosOsLivros, ordenacao);

    html = construir_HTML(nomesAtributos, livrosOrdenados);
    mostra_HTML("vitrineLivros", html);
  }
}

function parseFile(fileText){
    var resultado 		= "";
    var nomesAtributos 	= "";
    var livros         	= "";
    var ordenacao      	= "";
    var objetoLivro    	= {};
    var livrosTratados 	= [];

    if(fileText != ""){
      nomesAtributos  = fileText[0];
      livros 		 	= fileText[1];
      ordenacao   	= fileText[2];

      for(var i = 0; i < livros.length; i++){
        objetoLivro = {};
        livros[i] = livros[i].split(";");

        for(var j = 0; j < livros[i].length; j++){
          objetoLivro[nomesAtributos[j]] = livros[i][j];
        }
        livrosTratados.push(objetoLivro);
      }
      resultado = [nomesAtributos, livrosTratados, ordenacao];
    }

    return resultado;
}

function validateFile(fileText){
    var nomesAtributos 	  		= "";
    var livros         	  		= "";
    var ordenacao      	  		= "";
    var qtdAtributosLivro 		= "";
    var qtdAtributosAnunciados  = "";

    if(fileText.includes("***") && fileText.includes("$$$")){
      fileText    		= fileText.replace(/\r?\n|\r/g, "");
      fileText    		= fileText.split("***");
      fileText[1] 		= fileText[1].split("$$$");

        nomesAtributos 	= fileText[0].split(";");
        livros 			= fileText[1][0].split("|?|");
        ordenacao 		= fileText[1][1].split("|?|");

        if(nomesAtributos[nomesAtributos.length - 1] == ""){ nomesAtributos.pop(); }
        if(ordenacao[ordenacao.length - 1] == ""){ ordenacao.pop(); }
        if(livros[livros.length - 1] == ""){ livros.pop(); }

        qtdAtributosLivro      = livros[0].split(";").length;
        qtdAtributosAnunciados = nomesAtributos.length;

        if(qtdAtributosAnunciados == qtdAtributosLivro){
            if(ordenacao != ""){
              var resultado = verifica_Ordenacao(ordenacao, nomesAtributos);
              if(resultado === true){
                fileText = [nomesAtributos, livros, ordenacao];
              } else {
                throw new OrderingException(resultado);
              }
            } else {
              fileText = "";
            }
        } else {
          throw new OrderingException("Quantidade de atributos anunciada não é igual a quantidade utilizada.");
        }

        return fileText;
    } else {
      throw new OrderingException("Arquivo de texto não está configurado corretamente.\nVerificar *** e $$$");
    }
}

function verifica_Ordenacao(ordenacao, nomesAtributos){
    var resultado = true;
    var encontrou = false;
    var atributoOrdenado;
    var direcaoOrdenacao;

    for(var i = 0; i < ordenacao.length; i++){

        ordenacao[i] = ordenacao[i].split(";");

        if(ordenacao[i].length == 2){

            atributoOrdenado = ordenacao[i][0];
            direcaoOrdenacao = ordenacao[i][1];

            if(direcaoOrdenacao == "Ascendente" || direcaoOrdenacao == "Descendente"){

                for(var j = 0; j < nomesAtributos.length; j++){

                    if(atributoOrdenado == nomesAtributos[j]){

                        j = nomesAtributos.length;
                        encontrou = true;

                    } else if( j == nomesAtributos.length - 1 && encontrou == false ) {

                        resultado = "O arquivo contém erros de configuração de ordenação!\nErro encontrando na palavra: " + ordenacao[i];
                        i = ordenacao.length;
                        
                    }

                }

            } else {

                resultado = "O arquivo contém erros de configuração de ordenação!\nErro encontrando na direção utilizada: " +direcaoOrdenacao;
                i = ordenacao.length;

            }

        } else {

            resultado = "O arquivo contém erros de configuração de ordenação!\nA configuração deve ser realizada da seguinte forma:\nAtributo_a_ser_ordenado;Direção_ordenação";
            i = ordenacao.length;

        }
        
        encontrou = false;

    }

    return resultado;
}

function servico_Ordenacao(livros, ordenacao){
    var atributo;
    var direcao;
    var atributoAnterior;

    for(var i = 0; i < ordenacao.length; i++){

        atributo 		 = ordenacao[i][0];
        direcao  		 = ordenacao[i][1];
        livros   		 = realiza_ordenacao(livros, atributo, atributoAnterior, direcao);
        atributoAnterior = atributo;

    }

    return livros;
}

function realiza_ordenacao(livros, atributo, atributoAnterior, direcao){

    livros.sort(function(a, b) {

        if(atributoAnterior == ""){

            return algoritmo_ordenacao(a, b, atributo, direcao);

        } else if(a[atributoAnterior] == b[atributoAnterior]) {

            return algoritmo_ordenacao(a, b, atributo, direcao);

        }

    });

    return livros;
}

function algoritmo_ordenacao(a, b, atributo, direcao){
    if(isNaN(a[atributo] - b[atributo])){

        if (a[atributo] < b[atributo]) {
            if(direcao == "Ascendente"){

                return -1;

            }else{

                return 1;

            }
        }

        if (a[atributo] > b[atributo]) {

            if(direcao == "Ascendente"){

                return 1;

            }else{

                return -1;
                
            }

        }

        return 0;

    }else{

        if(direcao == "Ascendente"){

            return a[atributo] - b[atributo];

        }else{

            return b[atributo] - a[atributo];
            
        }

    }
}

function construir_HTML(nomesAtributos, livros){
    var html = "";

    html += "<table border='1px' width='600px'>";
    html += "<tr>";

    for(var i = 0; i < nomesAtributos.length; i++){

        html += "<th>";
        html += nomesAtributos[i];
        html += "</th>";

    }

    html += "</tr>";

    for(var j = 0; j < livros.length; j++){

        html += "<tr>";

        for(var k = 0; k < nomesAtributos.length; k++){
            html += "<td>";
            html += livros[j][nomesAtributos[k]];
            html += "</td>";
        }
        
        html += "</tr>";

    }

    html += "</table>";

    return html;
}

function mostra_HTML(local, html){

    document.getElementById(local).innerHTML = html;

}

function OrderingException(message) {

    const error = new Error(message);
    console.error(message);

    return error;

}
