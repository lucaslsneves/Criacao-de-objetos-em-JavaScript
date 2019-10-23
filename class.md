# `class` em JavaScript.

## Não existem classes em JS `class` é apenas uma 'syntactic sugar', da herança feita por prototypes.

Vamos criar uma classe em JS para entendermos melhor.

```
class Mammal{
    constructor(sound){
        this.sound = sound
    }
    
   talk(){
        return this.sound
    }
 }

 class Dog extends Mammal{
     constructor(sound){
         super(sound)
     }
 }
 let fluffy = new Dog('wooof');
 
 console.log(fluffy) // Irá retornar o objeto, "Dog {sound: 'wooof'}"

 let fluffySound = fluffy.talk();
 
 console.log(fluffySound) // irá retornar "wooof"
```
Como vimos acima temos um construtor e é possível uma classe extender a outra, 
como em qualquer outra linguaguem orientada a objetos.

Agora vamos mostrar que `class` é apenas uma 'syntactic sugar' da herença feita por  prototypes

```
class Mammal{
    constructor(sound){
        this.sound = sound
    }
    
   talk(){
        return this.sound
    }
 }

 class Dog extends Mammal{
     constructor(sound){
         super(sound)
     }
 }
 let fluffy = new Dog('wooof');

 console.log(Mammal) // irá retornar 'Function Mammal

 console.log(Mammal.isPrototypeOf(Dog)) // irá retorna 'true'

 console.log(fluffy.__proto__) // irá retorna Dog.
```

Comprovamos no exemplo acima,que não existe classe em JS.

No nosso 1 `console.log(Mammal)` vimos que na verdade ao criar uma class estamos criando uma função construtora e __não uma classe__.

No nosso 2 `console.log(Mammal.isPrototypeOf(Dog))` vimos que ao usar `extends` na verdade estamos definindo que a "class" __Dog__ terá como prototype __Mammal__.

No nosso 3 `console.log(fluffy.__proto__)` vimos que ao criar um Objeto a partir de uma `class` estamos definindo que esta __class__ será o prototype deste objeto.

##  Conclusão

Não existe __classes__ em JavaScript, classes em JS são apenas outra forma utilizar a herança através de prototypes.
