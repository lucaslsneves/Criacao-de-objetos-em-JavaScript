const cat = {
    init: function(sound){
        this.sound = sound
        return this
    },
    makeSound: function (){
           console.log(this.sound)
    },
    
}


const mark = Object.create(cat).init("i sayy heyyy")
const niko = Object.create(cat).init("you ooooooooh")

console.log(mark)
console.log(niko)

