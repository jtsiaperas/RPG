function character(name,attack,counterDMG,health,portrait){
	this.name= name;
	this.attack= attack;
	this.counterDMG= counterDMG;
	this.health= health;
	this.portrait= portrait;
}
//used to weight randomly generated attributes, attack is heavily weighted
var neutral = [];
var enemies = [];
var player;
var portraits = {"orc": "assets/images/Orc.png","elf":"assets/images/Elf.png",
"human": "assets/images/Human.png","cyclops":"assets/images/Cyclops.png"};
var names = Object.keys(portraits);
var characters = [];
var playerChose;
var baseAttack;
var selected;

function getIndex(name,array){
	console.log(name);
  console.log(array);
  for (i=0; i<array.length; i++)
		{
			
			var temp = array[i];
			console.log(temp);
      if (name == temp.name)
				{
					return i;
				}
		}
}

function newGame(){
	var randomAttack;
	var randomDMG;
	var randomHealth;
	neutral = [];
	enemies = [];
  characters = [];
  playerChose = false;
	  for (i = 0; i < 4; i++)
	 {
		//randomly generated attributes, health is favored
		randomAttack = Math.floor(Math.random()*10+1);
		randomDMG = Math.floor(Math.random()*10+1);
		randomHealth = 40-randomAttack-randomDMG;
		//using a total # of points hopefully prevents overpowered characters
		var temp = new character(names[i],randomAttack,randomDMG,randomHealth,portraits[names[i]]);
		characters.push(temp);
		neutral.push(temp);
	}
    draw();
  }

function draw(){
    
    for (i=0; i<enemies.length; i++)
    {
      var temp = enemies[i];
      $(".enemy"+i).attr("id",temp.name);
      $(".enemy"+i).find("h1").text(temp.name);
      $(".enemy"+i).find("img").attr("src", temp.portrait);
      $(".enemy"+i).find(".attack").text(temp.attack);
      $(".enemy"+i).find(".counter").text(temp.counterDMG);
      $(".enemy"+i).find(".health").text(temp.health);
    }


    for (i=0; i<neutral.length; i++)
    {
      var temp = neutral[i];
      $(".neutral"+i).attr("id",temp.name);
      $(".neutral"+i).find("h1").text(temp.name);
      $(".neutral"+i).find("img").attr("src", temp.portrait);
      $(".neutral"+i).find(".attack").text(temp.attack);
      $(".neutral"+i).find(".counter").text(temp.counterDMG);
      $(".neutral"+i).find(".health").text(temp.health);
    }

      if(playerChose){
      $(".player").attr("id",player.name);
      $(".player").find(".h1").text(player.name);
      $(".player").find(".img").attr("src", player.portrait);
      $(".player").find(".attack").text(player.attack);
      $(".player").find(".counter").text(player.counterDMG);
      $(".player").find(".health").text(player.health);
      }
   }


$(document).ready(function(){
    newGame();
   
    $(".character").on("click", function(){
        if (playerChose)
        {
           if (this.id!=player.name){
               selected = getIndex(this.id,enemies);
               var temp = enemies[selected];
               temp.health -= player.attack;
               // if (temp.health <= 0)
               // {

               // }
               enemies[selected] = temp;
               player.attack += baseAttack;
           }
         }
        else
        {
        	selected = getIndex(this.id,characters);
          player = characters[selected];
         	baseAttack = player.attack;
        	playerChose = true;
        	for (i = 0; i<characters.length; i++)
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
