# This e Bind
## Por que começar a estudar a criação de objetos com __This__ and __Bind__?

### Porque é de extrema importancia entender 'this' e 'bind' antes de tentar aprender qualquer outra coisa, porque eles são conceitos fundamentais de como objetos são criados em JavaScript. Se você não entender __bind__ , quase nada na criação de objetos com JS fará sentido.
## A melhor forma de entender `this` em JavaScript é através de um exemplo:

### Exemplo 1

Vamos  criar um objeto chamado gato que terá uma propriedade chamada som e um método miar que apenas irá executar um `console.log` da propriedade som. 

Logo após vamos executar o método miar e ver o que será impresso no console.

```
let gato{
    som:'miau',
    miar:function(){
        console.log(this.som)
    }
}

gato.miar() // Imprime no console 'miau'
```

Até o momento,uma pessoa que veio de uma linguagem orientada a objetos não lerá este código com estranhesa.

O uso de `this` na criação do método `miar`,no exemplo acima,tem  o mesmo sentido do `this` de qualquer linguagem orientada a objetos.

Ela apenas deixa claro que é para o método `miar` usar a propriedade `som` do contexto do objeto e não de uma váriavel de mesmo nome `som` de outro contexto .

Veja um exemplo para que isso fique mais claro.
### Exemplo 2
```
const som = 'AuAu'

let gato{
    som:'miau',
    miar:function(){
        console.log(this.som)
    }
}

gato.miar() // Imprime no console 'miau'
```
Ficou mais claro? o `this` faz com que o método `miar` utilize a propriedade `som` do objeto  e não da váriavel `const = som` criada em outro contexto. 

Como no exemplo acima o `this` foi chamado no contexto do objeto gato,o `this` faz referencia a ele.

__Ou seja, `this` faz referencia ao contexto no qual ele foi chamado.__ Essa afirmação ficará mais clara com os próximos exemplos.

### Agora vamos continuar o nosso __Exemplo 1__.
Vamos criar uma variavél `funcMiar` e atribuir a ela o método `miar` do nosso objeto gato, em seguida executar a `funcMiar` e ver o que será impresso no console.

Sim,em JavaScript é possível atribuir uma função a uma variável,pois JS não é apenas uma linguagem orientada a objetos ,mas também é uma linguaguem de programação funcional.

### Continuação do Exemplo 1
```
let gato{
    som:'miau',
    miar:function(){
        console.log(this.som)
    }
}

gato.miar() // Imprime no console 'miau'

let funcMiar = gato.miar

funcMiar() // Imprime no console 'undefined'
```
Aqui é onde as pessoas começam a ficar confusas.

Ao executar a função `funcMiar` o que será impresso no console é `'undefined'`. Agora vamos entender o por que disto acontecer.

Para ficar mais claro eu vou reescrever o __Exemplo 1__ de outra maneira. Ao invés de atribuir à  `funcMiar` o método `miar` do objeto __gato__ eu vou passar a mesma função só que diretamente na variavél `funcMiar`.

### Continuação do Exemplo 1 (Reescrito com outras palavras,mas com o mesmo signifcado)

```
let gato{
    som:'miau',
    miar:function(){
        console.log(this.som)
    }
}

gato.miar() // Imprime no console 'miau'

let funcMiar = function(){
      console.log(this.som)
    }

funcMiar() // Imprime no console 'undefined'
```

Agora ficou mais fácil de percerber que a váriavel `funcMiar` é apenas uma função,assim sendo não existe realmente um `this` neste contexto. O `this` em  funcões refere-se ao contexto em que ela foi __executada__.

No exemplo acima  a função `funcMiar` foi executada em um contexto global.

O contexto global no Browser (navegador) é o objeto window,já no Node é o objeto chamado global.

Então ao tentar executar `console.log(this.som)` é executado `console.log(window.som)` ,caso você execute este código no navegador ou `console.log(global.som)` ,caso você execute este código no Node.

Como não existe nenhuma propiedade chamada `som` nos objetos globais (window e global) será retornado `'undefined'`.

Já quando executamos `gato.miar` é executada a mesma função da variavel `funcMiar` ,porém o que é impresso no console é `'miau'`.

 A única coisa que  mudou foi o contexto em que ela foi executada,o contexto agora é o objeto __gato__, então é executado o seguinte código `console.log(gato.som)`,como existe uma propriedade no objeto gato chamada `som`,será impresso no console `'miau'` , como vimos no exemplo acima.

Entretanto é possível forçar um novo contexto para a `funcMiar`,  através de uma função chamada `bind` . Veja o mesmo __Exemplo 1__ só que agora a função `funcMiar` vai receber o retorno da função `gato.miar.bind(gato)`.
## Uso do `bind`
### Exemplo 1,agora com a função `bind`

```
let gato{
    som:'miau',
    miar:function(){
        console.log(this.som)
    }
}

gato.miar() // Imprime no console 'miau'

let funcMiar = gato.miar.bind(gato)

funcMiar() // Imprime no console 'miau'
```

A função `bind` retorna uma nova função que força o `this` desta nova função ser o objeto passado como parâmetro.

No exemplo acima passamos como parâmetro da função `bind` o objeto __gato__.Ou seja, a nova função que será retornada pelo método `bind` terá o contexto do object __gato__ . 

Portanto será impresso no console `'miau'`.

## Caso real de uso do `bind`
Agora que ja entendemos como o bind funciona,você deve estar se perguntado "onde eu consigo utilizar isso,em uma aplicação real?"

Vamos ver um caso real,através de outro exemplo.

Vamos selecionar um botão do nosso HTML e adicionar um evento de click a ele.
```
let gato{
    som:'miau',
    miar:function(){
        console.log(this.som)
    }
}

const button = document.querySelector('.button');

button.addEventListener('click', gato.miar ); 

// Ao botão ser clicado será impresso no console 'undefined'

```

Vamos reescrever o exemplo acima com outras palavras,para que fique mais claro o por que que será impresso no console `'undefined'`.

```
let gato{
    som:'miau',
    miar:function(){
        console.log(this.som)
    }
}

const button = document.querySelector('.button');

button.addEventListener('click', function(){
        console.log(this.som)
    }); 

    // Ao botão ser clicado será impresso no console 'undefined'

```

Nos dois últimos exemplos acima adicionamos um ouvinte de click ao botão de classe '.button',e passamos como segundo parametro uma função que será executada quando o botão for clicado.

Quando o botão for clicado,o browser executa a função passada no parâmetro no contexto global (window), como não existe nenhuma propriedade chamada `window.miar` será impresso no console `'undefined'`.

Uma solução para isto seria usar a o `bind` para vincular o contexto do objeto __gato__ a função. Assim sendo, mesmo que a função seja chamada pelo browser em um contexto global, o contexto da função será o objeto __gato__. 

## Veja no exemplo

```
let gato{
    som:'miau',
    miar:function(){
        console.log(this.som)
    }
}

const button = document.querySelector('.button');

button.addEventListener('click', gato.miar.bind(gato) );

// Ao botão ser clicado será impresso no console 'miau'

```

Concluimos que o this faz referencia contexto em que é executado e que através da função `bind` podemos vincular um novo contexto a uma função.














