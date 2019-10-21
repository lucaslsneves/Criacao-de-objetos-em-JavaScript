# `__proto__` vs `prototype`

## Prototype
__prototype__ é uma propriedade que está presente __apenas__ em __funções__. Ao criar uma função,ela automaticamente terá a propriedade __prototype__  e esta propriedade só terá utilidade (sentido) se a função for construtora.
Porque os objetos criados através dela poderão ter acesso a esta propriedade,através da propriedade `__proto__` que está presente apenas em objetos e ela apenas aponta para o seu `prototype`.


## `__proto__`

`__proto__`   é uma propriedade que está presente em objetos e ela apenas aponta (é uma referência) para o seu real __prototype__ .

Vamos para os exemplo para que isto fique mais claro.

### Exemplo 1

```
let cat {
    raca: 'persa'
}

let myCat = {
    name = 'niko'
}

Object.setPrototypeOf(myCat,cat)

myCat.raca // 'persa'

myCat.__proto__  // irá retorna o objeto cat

myCat.prototype = // irá retornar undefined

```
No exemplo acima vimos que o objeto myCat tem a propriedade `__proto__ ` e ela retornará o objeto cat , pois foi assim que definimos através deste comando `Object.setPrototypeOf(myCat,cat)`

Entretanto,ao tentarmos acessar a propriedade `prototype` o valor que foi retornado é undefined,pois está propriedade só existe em funções.

### Exemplo 2
```

function Dog(){
}

Dog.prototype.raca = 'Bulldog'

let myDog = new Dog()

myDog.raca // irá retorna 'Bulldog'

```

No exemplo acima,como ja haviamos falado,toda função possui a propriedade `prototype` e ela só fará sentido se a função for construtora,pois objetos criados através desta função poderão acessar as propriedades do seu `prototype` através da propriedade `__proto__` que está presente apenas em objetos e ela apenas aponta para o `prototype`.

O que ocorreu no exemplo acima foi o seguinte:

Criamos uma função construtora,toda função possui a propriedade `prototype`. Objetos criados a partir desta função terão acesso a este prototype através da propriedade `__proto__`.

Adicionamos uma propriedade ao __prototype__ chamada raca.

Criamos o objeto myDog a partir da função construtora myDog(). Ao fazer isto define-se como `__proto__` do myDog o prototype da função construtora (Dog.prototype,neste caso).

Ao executar o comando `myDog.raca` o JavaScript,primeiro procura esta propriedade no objeto __myDog__ como esta propriedade não existe ela vai na propriedade `__proto__` que aponta para o __prototype__ Dog,ou seja, o JavaScript irá procurar no `Dog.prototype` se existe esta propriedade existe. 

Como ela existe e tem como valor a string 'Bulldog' é isto que será retornado.


# Conclusão

Toda função possuirá a propriedade `prototype` e ela será utilizada quando chamarmos a palavra-chave `new`.

Pois, a palavra `new` define para o objeto que está sendo criado que sua propriedade `__proto__` apontará para o `prototype` da função construtora.

Assim sendo os objetos criados terão acesso ao que foi definido na propriedade `prototype`.

Vale ressaltar que objetos não possuem a propriedade `prototype` e sim `__proto__` que é uma refência do seu `prototype`.




