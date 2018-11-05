function principal(){
	var arquivo;
	var todosOsLivros;
	var ordenacao;
	var livrosOrdenados;
	var html;

	try {

    	arquivo = ler_Arquivo();

	} catch(e) {

	    alert(e);

	}
}

function ler_Arquivo(){
	var arquivo 		= requisicao_Arquivo(g_URL + "livros.txt");

	var resultado 		= "";
	var nomesAtributos 	= "";
	var livros         	= "";
	var ordenacao      	= "";
	var objetoLivro    	= {};
	var livrosTratados 	= [];

	arquivo = verifica_Arquivo(arquivo);

	if(arquivo != ""){
		nomesAtributos  = arquivo[0];
		livros 		 	= arquivo[1];
		ordenacao   	= arquivo[2];

		for(var i = 0; i < livros.length; i++){

			objetoLivro = {};
			livros[i] = livros[i].split(";");

			for(var j = 0; j < livros[i].length; j++){

				objetoLivro[nomesAtributos[j]] = livros[i][j];

			}

			livrosTratados.push(objetoLivro);

		}

		resultado = [livrosTratados, ordenacao];

	}

	return resultado;

}

function verifica_Arquivo(arquivo){
	var nomesAtributos 	  		= "";
	var livros         	  		= "";
	var ordenacao      	  		= "";
	var qtdAtributosLivro 		= "";
	var qtdAtributosAnunciados  = "";

	if(arquivo.includes("***") && arquivo.includes("$$$")){
		arquivo    		= arquivo.replace(/\r?\n|\r/g, "");
		arquivo    		= arquivo.split("***");
		arquivo[1] 		= arquivo[1].split("$$$");

		nomesAtributos 	= arquivo[0].split(";");
		livros 			= arquivo[1][0].split("|?|");
		ordenacao 		= arquivo[1][1].split("|?|");

		if(nomesAtributos[nomesAtributos.length - 1] == ""){ nomesAtributos.pop(); }
		if(ordenacao[ordenacao.length - 1] == ""){ ordenacao.pop(); }
		if(livros[livros.length - 1] == ""){ livros.pop(); }

		qtdAtributosLivro      = livros[0].split(";").length;
		qtdAtributosAnunciados = nomesAtributos.length;

		if(qtdAtributosAnunciados == qtdAtributosLivro){
			if(ordenacao != ""){
				var resultado = verifica_Ordenacao(ordenacao, nomesAtributos);
				if(resultado === true){

					arquivo = [nomesAtributos, livros, ordenacao];

				} else {

					throw new OrderingException(resultado);

				}
			} else {

				arquivo = "";

			}

		} else {

			throw new OrderingException("Quantidade de atributos anunciada não é igual a quantidade utilizada.");

		}

		return arquivo;

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

function requisicao_Arquivo(caminho){
    var arquivo = new XMLHttpRequest();
    var resultado;

    arquivo.open("GET", caminho, false);
    arquivo.setRequestHeader("Cache-Control", "no-cache");
    arquivo.onload = function (e) {

		if (arquivo.readyState == XMLHttpRequest.DONE) {

		  	if (arquivo.status == 200) {

		  		resultado = arquivo.responseText;

			}else{

				alert("Erro: \n"+arquivo.statusText);
				resultado = false;

			}

		}
	};

	arquivo.send();
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

function construir_HTML(livros){
	var html = "";
	var atributos = Object.keys(livros[0]);

	html += "<table border='1px' width='600px'>";
	html += "<tr>";

	for(var i = 0; i < atributos.length; i++){

		html += "<th>";
		html += atributos[i];
		html += "</th>";

	}

	html += "</tr>";

	for(var j = 0; j < livros.length; j++){

		html += "<tr>";

		for(var k = 0; k < atributos.length; k++){

			html += "<td>";
			html += livros[j][atributos[k]];
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