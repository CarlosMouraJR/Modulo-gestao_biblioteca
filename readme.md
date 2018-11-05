# Módulo de gestão de biblioteca
Esta é um pequeno módulo de um pequeno sistema de gestão de biblioteca. Este módulo se restringe a receber livros, organiza-los e mostra-los em uma vitrine.

## Estrutura

| Nome do Arquivo   | Extensão                                          
| ----------------- | ----------
| index   			| HTML                            
| livros   			| TXT
| script   			| JS         

O HTML é apenas a estrutura visual do módulo.
O arquivo de texto contém os atributos a serem utilizados, os livros com seus respectivos atributos e a ordenação desejada.
Todas as regras do módulo são executadas em um arquivo chamado script.js.

## Como usar o módulo
É necessário preencher o arquivo de texto 'livros.txt' com a seguinte estrutura:

```
Atributos utilizados pelos livros [Cada atributo deverá ser separado por ;]			                           
***   			
Livros [Conteúdos dos atributos separados por ;][Livros separados por |?|]
$$$  
Ordenação vertical desejada [orientação e direção separadas por ;][Ordenações separadas por |?|]
```

### Exemplo:
```
Title;Author;Edition			                           
***   			
Java How To Program;Deitel & Deitel;2007|?|
Patterns of Enterprise Application Architecture;Martin Fowler;2002|?|
Head First Design Patterns;Elisabeth Freeman;2004|?|
Internet & World Wide Web: How to Program;Deitel & Deitel;2007|?|
$$$  
Author;Ascendente|?|Title;Descendente
```

## Como funciona

A partir de agora, será mostrada a sequência de funções sendo chamadas (da primeira a última) com suas devidas explicações:

| #   | Função                   | Explicação            
| --- | ------------------------ | ----------------------------------------------------------
| 1   | principal()    			 | Responsável por manter a estrutura da lógica completa.
| 2   | ler_Arquivo()  			 | Função que chama via AJAX um arquivo local, verifica a estrutura deste arquivo e devolve o seu conteúdo formatado para a ordenação.
| 3   | servico_Ordenacao()      | Recebe os livros formatados e ordena de forma comparativa, utilizando a função nativa 'sort' com pequenas funcionalidades a mais (para respeitar as regras requisitadas).
| 4   | construirHTML()  		 | Constrói todo o código HTML para ser exibido, utilizado os livros ordenados.
| 5   | mostraHTML()  		  	 | Mostra o código HTML em uma ID apontada.

## Entrando em detalhes: A ordenação, como funciona?
É possível utilizar mais de um parâmetro para a ordenação, mas como isso funciona exatamente?
Vamos olhar um exemplo de parametrização:

```
Author;Ascendente|?|Title;Descendente
```

Neste exemplo, vai ocorrer duas ordenações:

| #   | Ordenação requisitada   	| Execução                                          
| --- | --------------------------- | ----------------------------------------------------------
| 1   | Author;Ascendente   		| O algoritmo vai ordenar TODOS os livros de forma ascendente (ou seja, do menor para o maior em ordem alfabética).
| 2   | Title;Descendente			| O algoritmo vai verificar se existiu uma ordenação anterior a esta (neste caso, SIM) então vai pegar o atributo anterior ordenado (neste caso, Author) e vai comparar TODOS os livros. Apernas os livros com 'Author' iguais vão sofrer uma ordenação de 'Title', de forma descendente (ou seja, do maior para o menor em ordem alfabética).

### E os números, como ficam?
Todo elemento que contenha SOMENTE NÚMEROS será tratado de forma diferente, sendo usado a ordem numérica (0, 1, 2 e etc).
Caso seja um elemento que contenha letras e números, será tratado como texto e sofrerá ordenação de acordo com o dicionário nativo do javascript (lexicographically).


## Tecnologias utilizadas

| Nome da tecnologia | Versão                                          
| -----------------  | ----------
| Javacript  		 | Atual, puro                            
| HTML   			 | 5   

## Suporte

| Navegador 		 | Versão                                          
| -----------------  | ----------
| Chrome  		 	 | 70.0.3538.77