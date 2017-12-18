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
var portraits = {"orc": "assets/images/Orc.png","elf":"assets/images/Elf.png",
"human": "assets/images/Human.png","cyclops":"assets/images/Cyclops.png"};
var names = Object.keys(portraits);
var characters = [];
var playerChose;
var baseAttack;

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
		neutral.push(characters[i]);
		playerChose = false;
    }
    draw();
}
function createHTML(character){
    var result = "<div class='col character' id='"+character.name+"'>";
    result+="<h1>"+character.name+"</h1>";
    result+="<img src='"+character.portrait+"'>";
    return result;
}

function draw(){
    $("#enemies").empty();
    $("#neutral").empty();
    $("#player").empty();
    for (i = 0; i<enemies.length; i++)
	{
		$("#enemies").append(createHTML(enemies[i]));
	}

	for (i = 0; i<neutral.length; i++)
	{
		$("#neutral").append(createHTML(neutral[i]));
	}
    if (playerChose){
	$("#player").html(createHTML(player));
    }
}	
	

$(document).ready(function(){
    newGame();
    $(".character").on("click", function(){
        var selected = characters.indexOf(this.id);
        if (playerChose)
        {

        }
        else
        {
        	
        	player = characters[selected];
        	playerChose = true;
        	for (i = 0; i<neutral.length; i++)
        	{
        		if (i != selected)
        		{
        			enemies.push(characters[i]);
        		}
            }
            neutral = [];
        }

    });
});
