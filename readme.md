# Módulo de gestão de biblioteca
Esta é um pequeno módulo de um pequeno sistema de gestão de biblioteca. Este módulo se restringe a receber livros, organiza-los e mostra-los em uma vitrine.

## Razão de existir
Este módulo faz parte de um sistema maior. Sua função é receber uma lista de atributos que serão utilizados nos livros, uma lista de livros com seus respectivos atributos e com uma ou mais regras de ordenação. O módulo se encarregará de executar as instruções necessárias e irá mostrar na tela, utilizando HTML, a listagem de livros na ordem configurada.

## Como usar
Você precisa configurar a variável que contêm o caminho para a pasta do projeto e alterar o arquivo de texto 'livros.txt' de acordo com a estrutura pré-definida e desejada.

### 0 - Configurar caminho do projeto
É necessário mostrar a pasta do módulo a partir da pasta raiz do seu servidor. A variável se chama 'g_URL' e fica no começo do arquivo 'script.js'.

### 1 - Atributos
O módulo permite inserir quaisquer atributos, com quaisquer nomes e em qualquer quantidade (Autor, Edição, Título, Tipo de capa, Ano de lançamento e etc.). O importante é respeitar a regra que se definir 5 atributos, cada livro deverá ter 5 atributos (vinculo realizado pela ordem dos atributos declarados e conteúdos utilizados). Cada atributo deve ser separado por ponto e vírgula ; e devem estar declarados antes do quebra-texto representado por 3 asteriscos juntos. Exemplo:

```
Título;Autor;Edição
***
```

### 2 - Livros
É possível também inserir quantos livros quiser. Lembre-se de respeitar a quantidade de atributos de acordo com os definidos anteriormente. Cada Livro deverá ser separado por 'barra interrogação barra' |?| e cada atributo de um livro separado por ponto e vírgula ;. Exemplo:


```
Java How To Program;Deitel & Deitel;2007|?|
Patterns of Enterprise Application Architecture;Martin Fowler;2002
```

### 3 - Ordenação
A partir do separador de livros e da ordenação, que é representado por três cifrões $$$, é permitido a configuração de ordenação única ou múltipla. 

#### 3.1 - Ordenação única
A ordenação única vai organizar todos os livros uma única vez. 

Exemplo:
```
Autor;Ascendente
```
Resultado: O algoritmo vai ordenar TODOS os livros de forma ascendente de acordo com o atributo 'Autor' (ou seja, do menor para o maior em ordem alfabética).

#### 3.2 - Ordenação múltipla
A ordenação múltipla vai organizar os livros de acordo com a quantidade e direção desejadas.

Exemplo:
```
Título;Ascendente|?|Edição;Descendente
```
Resultado: O algoritmo vai rodar uma vez, ordenando todos os livros de acordo com a 'Título' (ou seja, do menor para o maior em forma alfabética). Após isso, vai verificar se existiu uma ordenação anterior a esta (neste caso, SIM), então vai pegar o atributo anterior ordenado (neste caso, 'Título') e vai comparar TODOS os livros. Apenas os livros com 'Título' iguais vão sofrer uma ordenação de 'Edição', de forma descendente (ou seja, do maior para o menor em ordem alfabética).


Exemplo de arquivo 'livros.txt' completamente configurado:
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

#### 3.3 - Ordenação com elementos numéricos
Todo elemento que contenha SOMENTE NÚMEROS será tratado de forma diferente, sendo usado a ordem numérica (0, 1, 2 e etc.).
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

## Estrutura

| Nome do Arquivo   | Extensão                                          
| ----------------- | ----------
| index   			| HTML                            
| livros   			| TXT
| script   			| JS         

O HTML é apenas a estrutura visual do módulo.
O arquivo de texto contém os atributos a serem utilizados, os livros com seus respectivos atributos e a ordenação desejada.
Todas as regras do módulo são executadas em um arquivo chamado script.js.


## Descrição das funções que compõem o módulo

Existe uma sequência de funções principais sendo chamadas e executando instruções:

| #   	  | Função                   	 | Explicação            
| ------- | ---------------------------- | ----------------------------------------------------------
| 1   	  | principal()    			 	 | Função responsável por manter toda a estrutura do módulo.
| 1.1  	  | ler_Arquivo()  			     | Função responsável por manipular o arquivo 'livros.txt'.
| 1.1.1	  | requisicao_Arquivo()  		 | Função responsável por chamar via AJAX o arquivo 'livros.txt'.
| 1.1.2   | verifica_Arquivo()  		 | Função responsável por verificar toda a estrutura do arquivo.
| 1.1.2.1 | verifica_Ordenacao()  		 | Função responsável por verificar e tratar exclusivamente os parametros da ordenação.
| 1.2     | servico_Ordenacao()      	 | Função responsável por manipular a ordenação.
| 1.2.1   | realiza_ordenacao()      	 | Função responsável por decidir quando a ordenação é necessária.
| 1.2.1   | algoritmo_ordenacao()      	 | Função responsável por realizar a ordenação.
| 1.3     | construirHTML()  		 	 | Função responsável por construir todo o código HTML utilizado os livros ordenados.
| 1.4     | mostraHTML()  		  	 	 | Função responsável por exibir o código HTML em uma ID apontada.
