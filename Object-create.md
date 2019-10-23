# `Object.create()`

`Object.create()` é um método estático do objeto __Object__. Vamos entender como ele funciona através de um exemplo.

Vamos criar um objeto chamado __cat__ que terá um método chamado 'makeSound' que executará um console.log da propriedade sound.

Então criaremos um objeto chamado __mark__ que será um __cat__, através do comando `Object.create(cat)`.

Depois criaremos uma propriedade para o objeto __mark__ chamada 'sound' e atribuiremos a ela um valor qualquer.

Depois executaremos o método `mark.makeSound()` e veremos o resultado.

Criaremos outro objeto chamado __niko__ que também será um gato e faremos a mesma coisa que fizemos a __mark__ só que o valor de propriedade __sound__ será diferente.

```
const cat = {
    makeSound: function (){
           console.log(this.sound)
    }
}

const mark = Object.create(cat)

mark.sound = 'meow'

mark.makeSound() // 'meow'

const niko = Object.create(cat)

niko.sound = 'Meoooooow'

niko.makeSound() //'Meoooooow'
```

## Mas, o que ocorre,exatemente, quando eu chamo `Object.create(cat)`?

`Object.create()` cria um objeto que terá como __prototype__ determinado objeto. No exemplo acima criamos os objetos __mark__ e __niko__ que terão como prototype o objeto __cat__ .

Podemos verificar isto através deste exemplo 

```
console.log( cat.isPrototypeOf(mark) ) // true
```

## Por que `Object.create()` existe?

Porque `Object.create()` é uma maneira mais "natural" de criar objetos do que o modelo de criar funções construtoras e aplicar a palavra `new` a elas. 

Vamos implementar o métedo `Object.create()` para entender o que ele faz "por dentro", a nossa função que implementará o `Object.create()` se chamará __'criarObj'__.
```
const cat = {
    makeSound: function (){
           console.log(this.sound)
    }
}

function criarObj(prototype){
    var obj = {}
    Object.setPrototypeOf(prototype)
    return obj;
}

const mark = criarObj(cat);

mark.sound = 'meow'

mark.makeSound() // 'meow'
```
Como vimos acima conseguimos implementar o nosso próprio `Object.create()`.

Se quisermos que cada objeto criado através do `Object.create()` tenha propriedades únicas,como o que ocorria quando usavamos funções construtoras e para que nós não tenhamos que criar as propriedade uma a uma como fizemos acima em `mark.sound = 'meow`.

Costuma-se fazer o seguinte: Criar um método dentro do prototype e ao executar ele será criado as propriedades necessárias dentro do objeto que chamou este método. 

Vamos ver um exemplo para que fique mais claro.

```
const cat = {
    init : function(sound){
            this.sound = sound;
            return this;
    },
    makeSound: function (){
           console.log(this.sound)
    }
}

const mark = Object.create(cat).init('meow')

mark.makeSound() // 'meow'

const niko = Object.create(cat).init('Meoooooow')

niko.makeSound() //'Meoooooow'
```

Criamos um método chamado __init__ dentro do nosso objeto __cat__ que será o prototype dos nossos objetos. Ao executar este método, é criado dentro do objeto que o chamou uma propriedade chamada __sound__ que terá como valor o parâmetro passado no método __init__ , no final do método __init__ damos um `return this` para que este método possa ser executado em conjunto com o método `Object.create()` como fizemos no exemplo acima.