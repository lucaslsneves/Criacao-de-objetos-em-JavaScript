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
 console.log(fluffy.__proto__);
 let fluffySound = fluffy.talk();
 
 console.log(fluffySound) // irá retornar "wooof"