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

	return arquivo;
}