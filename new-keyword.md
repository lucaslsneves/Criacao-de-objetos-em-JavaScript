# A palavra-chave New aplicada a funções

Nos iremos explorar neste guia a palavra __new__ aplicada a funções. Ela também pode ser aplicada a palavra-chave __class__ que foi introduzida no ES6,mas __class__ é apenas uma __syntax sugar__ .Por baixo dos panos,quando usamos a palavra __class__ o JS aplica,por baixo dos panos, a palavra chave __new__ também a funções.


Classes em JS,são criadas através de funções construtoras, elas tem a mesma estrutura de qualquer outra função. No exemplo a seguir vamos criar uma função construtora chamada _Pessoa_ (classe chamada pessoa) que terá apenas uma propriedade e o valor dela será passado como parâmetro na criação do objeto. Vamos para um exemplo para que isto fique mais claro.


## Exemplo 1
```
function Person(saying){
    this.saying = saying
 }

 Person.prototype.talk = function(){
    console.log('I say: 'this.saying)
}

var lucas = new Person('Lucaaas')

lucas.talk() // Será impresso 'I say: Lucaaas'
```

###  Por que entender new aplicada a funcções em JavaScript,já que no ES6 eu tenho a palavra chave class?

* Porque em sua carreira como um desenvolvedor JavaScript você vai ter q lidar com códigos que foram escritos em versões anteriores ao ES6,como no exemplo acima.

* A palavra-chave class usa examente a técnica vista no exemplo acima, por baixos dos panos.

# O que acontece quando chamamos a palavra new no Exemplo 1.

A palavra __new__ executa 4 passos:

1. Cria um objeto vazio.

```
var lucas = {};
```

2. Define como prototype do objeto que foi criado o prototype da função construtora.

```
Object.setPrototypeOf(lucas,Pessoa.prototype);
```

3. Executa a função construtora no contexto do objeto que está sendo criado,em outras palavras, executar a função construtora usando __this__ como o objeto que está sendo criado.

```
Pessoa.apply(obj,['Lucaaas']);
```

4. Retorna o objeto criado.

```
return lucas;
```
Para entendermos melhor, vamos supor que a palavra-chave __new__ não existe em JS e vamos implementar o nosso própio __new__.

A função que implementará o __new__ será chamada __myNew__.

Nossão função recebe como 1º parâmetro a função construtora e como 2º parâmetro o texto que será passado como parâmetro para função construtora __Pessoa__ , quando nós a executamos no contexto do objeto que está sendo criado (3º passo).
```
function Person(saying){
        this.saying = saying
 }

 Person.prototype.talk = function(){
    console.log('I say: 'this.saying)
}

function myNew(constructor,text){

    var obj = {} // 1º passo

    setPrototypeOf(obj,constructor.prototype) // 2º passo

    constructor.apply(obj,[text]); // 3º passo

    /* 
    Se o método __apply__ não é conhecido por você,ele faz a mesma coisa que o __bind__,execeto que ele é executado imediatamente. 
    No 1º parâmetro ele recebe o objeto que será usado como __this__ e no segundo ele
    recebe um array de argumentos que são necessários para execução do construtor.
    */

    return obj;  //  4º 
}

var lucas = myNew(Person,'Lucaaas')

lucas.talk() // Será impresso 'I say: Lucaaas'


```
Como vimos acima,nós conseguimos implementar a função __new__.

##  Conclusão 

Neste guia da palavra-chave __new__ decobrimos a importancia de saber qual o seu sentido,quando aplicade em funções construtoras.
Também vimos que o __new__ executa 4 passos.

1. Cria um objeto vazio.

2. Define como prototype do objeto que foi criado o prototype da função construtora.

3. Executa a função construtora no contexto do objeto que está sendo criado,em outras palavras, executar a função construtora usando __this__ como o objeto que está sendo criado.

4. Retorna o objeto criado.

