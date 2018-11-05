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