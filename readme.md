# Módulo de gestão de biblioteca
Esta é um pequeno módulo de um pequeno sistema de gestão de biblioteca. Este módulo se restringe a receber livros, organiza-los e mostra-los em uma vitrine.

## Estrutura

| Nome do Arquivo   | Extensão                                          
| ----------------- | ----------
| index   			| HTML                            
| livros   			| TXT
| script   			| JS         

O HTML é apenas a estrutura visual do módulo.
O arquivo de texto contem os atributos a serem útilizados, os livros com seus respectivos atributos e a ordenação desejada.
Todas as regras do módulo é executada em um arquivo chamado script.js.

## Como usar o módulo
É necessario preencher o arquivo de texto 'livros.txt' com a seguinte estrutura:

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
Author;Ascendente|?|Title;Ascendente
```

## Como funciona

Apartir de agora, será mostrada a sequencia de funções sendo chamadas (da primeira a última) com suas devidas explicações:

| #   | Função                   | Explicação            
| --- | ------------------------ | ----------------------------------------------------------
| 1   | principal()    			 | Responsável por manter a estrutura da lógica completa.
| 2   | ler_Arquivo()  			 | Função que chama via AJAX um arquivo local, verifica a estrutura deste arquivo e devolve o seu conteúdo formatado para a ordenação.
| 3   | servico_Ordenacao()      | Recebe os livros formatados e ordena de forma comparativa, utilizando a função nativa 'sort' com pequenas funcionalidades a mais (para respeitar as regras requisitadas).
| 4   | construirHTML()  		 | Constroi todo o código HTML para ser exibido, utilizado os livros ordenados.
| 5   | mostraHTML()  		  	 | Mostra o código HTML em uma ID apontada.

