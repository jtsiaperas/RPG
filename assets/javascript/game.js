function character(name,attack,counterDMG,health,portrait){
	this.name= name;
	this.attack= attack;
	this.counterDMG= counterDMG;
	this.health= health;
	this.portrait= portrait;
}
//used to weight randomly generated attributes, attack is heavily weighted
var neutral = [];
var enemy = [];
var player;
var portraits = {"orc": "../assets/images/Orc.png","elf":"../assets/images/Elf.png",
"human": "../assets/images/Human.png","cyclops":"../assets/images/Cyclops.png"};
var names = Object.keys(portraits);
var characters = [];

function newGame(){
	var randomAttack;
	var randomDMG;
	var randomHealth;
	neutral = [];
	enemy = [];
    characters = [];

	for (i = 0; i < 4; i++)
	{
		//randomly generated attributes, health is favored
		randomAttack = Math.floor(Math.random()*10+1);
		randomDMG = Math.floor(Math.random()*10+1);
		randomHealth = 40-randomAttack-randomDMG;
		//using a total # of points hopefully prevents overpowered characters
		characters[i] = new character(names[i],randomAttack,randomDMG,randomHealth,portraits[names[i]]);
    }

    console.log(characters);
}

newGame();