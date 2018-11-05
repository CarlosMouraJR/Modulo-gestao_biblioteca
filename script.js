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