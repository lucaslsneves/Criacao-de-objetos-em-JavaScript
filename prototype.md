# Prototype

### Você provavelmente já utilizou  de herança,com classes em outras linguagens orientadas a objeto. Em JavaScript conseguimos utilizar a herança através dos __prototypes__.


### Por que devo aprender __prototypes__ se em novas versões do JavaScript existe a palavra-chave __class__ ? .

#### Porque, __class__ na verdade é apenas uma "syntax sugar",ou seja, uma forma mais simples para usúarios que vem de linguagens orientadas a objetos conseguirem construir objetos e utilizar de herança de uma maneira muito parecida com outras linguagens orientadas a objetos.

#### Entretanto,por baixo dos panos,__o JavaScript utiliza de prototypes__,então você não consegue escapar do aprendizado de prototypes se você quiser se tornar um progamador sólido em JS. 

### Vamos partir para um exemplo para entender como os prototypes funcionam.

### Exemplo 1

```
fuction talk () {
    console.log(this.sound)
}

talk()

/* Imprime 'undefined' porque o this neste caso será o objeto global
e o objeto global não possui a propriedade sound.*/

```

Para verificar que o __this__ é realmente o objeto global podemos dar um `console.log(this)` na função 'talk' e ver o que será impresso no console.

```
fuction talk () {
    console.log(this)

    /* 
    Retorna um objeto cheio de propriedades como a 'setTimeOut' um
    método do objeto global.
    Entretanto não existe a propriedade sound,devido a isto o valor retornado será 'undefined
    */

    console.log(this.sound)
}

talk() // Será impresso o objeto global e em seguinda 'undefined'
```
Vamos prosseguir com o nosso exemplo.

Agora vamos criar um objeto 'animal' e ele terá um método chamado 'talk' que será igual a nossa função 'talk'. Logo depois vamos tentar executar este método e ver o que será impresso no console.

```
fuction talk () {
    console.log(this)
    console.log(this.sound)
}

let animal  = {
    talk  // isto é a mesma coisa que escrever talk:talk
    
    /*
    Quando a propriedade criada tem o mesmo nome da variavel
    que esta sendo atribuida a ela,podemos apenas
    omitir o nome da variavél que está sendo atribuida.
    */
}

  animal.talk()
```
__Será impresso no 1º `console.log` o objeto animal__,já que estamos executando a função 'talk' no contexto do animal,ou seja, a função talk tem como __this__ o objeto __animal__.

Já no segundo 2º `console.log` será impresso __'undefined'__,  pois o objeto animal não tem a propriedade __sound__.

Prosseguindo com o exemplo. Agora vamos criar um objeto __gato__  que terá a propriedade __sound__.

Em seguida através da função  `Object.setPrototypeOf()`, Iremos adicionar o __prototype  animal__ para o __gato__ e tentaremos executar o método `gato.talk()` e ve o que será impresso no console.

```
fuction talk () {
    `console.log`(this)
    console.log(this.sound)
}

let animal  = {
    talk  // isto é a mesma coisa que escrever talk:talk
}

let gato = {
    sound:'Miau'
}

Object.setPrototypeOf(gato, animal)

/*
Esta função recebe como 1º parametro o objeto o qual será adicionado o protoype
e como 2º parametro o  objeto que será adicionado.
*/```

gato.talk() será impresso o objeto 'gato' e 'Miau'
```
Foi impresso no 1º `console.log` o objeto __gato__,pois
executamos 'talk' no contexto de __gato__.

Foi impresso no 2º `console.log` 'Miau', pois agora devido a função `Object.setPrototypeOf(gato , animal)` o objeto __gato__ tem como __prototype o animal__. Ou seja, ele herda as propriedades e métodos do objeto __animal__.

O que ocorre é que o JavaScript tenta procurar no objeto __gato__ o método __talk__ como não existe nenhum método com este nome no objeto ele irá procurar este método no seu __prototype__.

Como existe um método chamado __talk__ no seu prototype ele o executa mantendo o contexto de __gato__ ao __this__ mesmo não existindo um método __talk__ no __gato__ e sim no seu __prototype__.

Isso ocorre pelo fato de que executamos o método através do objeto __gato__ (no contexto de gato,ou seja, o __this__ será __gato__).

Por isso é impresso no 2º `console.log` 'Miau'.

#### Vamos ver um outro exemplo,para que este conceito fique mais claro.

Vamos adicionar ao exemplo anterior um outro objeto chamado __gatoRaivoso__ e ele terá como única propriedade um método chamado __'talk'__  que apenas da um `console.log(this.sound.toUpperCase())` e vamos tentar executar este método.

Depois vamos atribuir como __prototype__ do __gatoRaivoso__ o objeto __gato__  e executar novamente o método __'talk'__  novamente para ver o resultado

```
fuction talk () {
    console.log(this.sound)
}

let animal  = {
    talk  // isto é a mesma coisa que escrever talk:talk
}

let gato = {
    sound:'Miau'
}

let gatoRaivoso = {
    talk: function(){
        console.log(this.sound.toUpperCase())
    }
}

Object.setPrototypeOf(gato, animal)

gato.talk() // Será impresso 'Miau'

gatoRaivoso.talk() // Será impresso 'undefined' pois não há a propriedade sound no gatoRaivoso

Object.setPrototypeOf(gatoRaivoso, gato) // Atribuindo ao gatoRaivoso o prototype gato

gatoRaivoso.talk() // será impresso 'MIAU'
```
Na 1ª execução do método `gatoRaivoso.talk() ` será impresso no console 'undefined' ,pois não existe a propriedade __sound__ no objeto __gatoRaivoso__.

Na 2ª execução do método `gatoRaivoso.talk()` já atribuimos antes o __prototype__ do objeto __gatoRaivoso__ para __gato__. 

Devido a isto como não existe a propriedade __sound__ no __gatoRaivoso__ o JS irá procurar esta propriedade no seu __prototype__ (__gato__).

 Como no seu __prototype__ existe esta propriedade ele irá utiliza-lá. Por isso será impresso na segunda execução da chamada `gatoRaivoso.talk()` __'MIAU'__.

#### Agora,vamos ver mais um exemplo

Neste exemplo vamos manter a `funtion talk`  e os objetos animal,gato e gatoRaivoso,só que agora o __gatoRaivoso__ será um objeto vazio.

__gatoRaivoso__ continuará tendo como prototype __gato__ e este continuará tendo como prototype __animal__.

Então executaremos o seguinte código `gatoRaivoso.talk()` e veremos qual será o reseultado disto.
```
fuction talk () {
    console.log(this.sound)
}

let animal  = {
    talk 
}

let gato = {
    sound:'Miau'
}

let gatoRaivoso = {
    
}

Object.setPrototypeOf(gato, animal)

Object.setPrototypeOf(gatoRaivoso,gato);

gatoRaivoso.talk(); // Será impresso 'Miau'
```
O que ocorreu foi o seguinte:

O JS procurou se o __gatoRaivoso__ possuia o método __talk__ como este método não existe dentro de __gatoRaivoso__ ele foi procurar no seu prototype __gato__.

Ao ver que também não existe nenhum método __talk__ dentro do objeto __gato__ ele foi verificar se o prototype do __gato__ que é o __animal__ possui este método.

Ao procurar dentro do __animal__ ele encontra o método __talk__ e o executa.


O método foi executado no contexto do __gatoRaivoso__,pois foi esse objeto que o invocou. 

__talk__ executa a seguinte instrução `console.log(this.sound)` como não existe a propiedade __sound__ dentro de __gatoRaivoso__ ele irá procurar em seu prototype __gato__.

Ao procurar dentro do __gato__ ele encontra a propiedade __sound__ que possui o valor de __'Miau'__ ele retorna este valor para o `console.log`

Devido a isto o que será impresso é 'Miau'.

Sei que o último exemplo citado pode ter parecido um pouco confuso,a primeira vista,mas com ele foi possível entender __bem__ como os prototypes funcionam.

### Conclusão

Concluimos que os prototypes são a forma com que o JavaScript lida com a herança entre objetos e que há uma cadeia de prototypes,se esta cadeia for muito grande poderá haver um problema de performace pois o JS terá que fazer várias buscas e ler vários objetos,verificando em cada um deles,se existe a propriedade a ser utilizada.



