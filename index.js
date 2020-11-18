var gameStarted = false;
var level = 0;
var buttonColors=["green","red","yellow","blue"];
var gamePattern = [];
var userPattern = [];
var i = 0; 
var wait =false;


//START GAME
$(document).keypress( (event) =>  {
    if (event.code == "Space" && !gameStarted) {
        reset();
        gameStarted = true;
        nextChapter();
    }
})


//COLOR BUTTON CLICKED
    $(".btn").click( (e) => {
        if (wait===false && gameStarted) {
            animateButton(e.target);
            userPattern.push("#"+e.target.id);
            checkAnswer();
        }
        
    });


//Go to next chapter if the solution good
function nextChapter(){
    $("#title").css("color",'white');
    userPattern = [];
    level++;
    gamePattern.push("#"+buttonColors[Math.floor((Math.random()*4))]);
    $("#title").text("Level "+level);
    
    animateGamePattern(gamePattern);
    console.log(gamePattern);
    i=0;
}

//Checking answers after every click
function checkAnswer(){
    let correct=false;
    if (userPattern[(userPattern.length)-1] ===  gamePattern[(userPattern.length)-1]){
        correct=true;
    } else{
        gameOver();
    }

    if ((userPattern.length == gamePattern.length)&&correct) {
        $("body").addClass("correct");
        
        setTimeout(function () {
            $("body").removeClass("correct");
            wait=true;
          }, 600);

        setTimeout(function () {
            nextChapter();
          }, 1200);

    }
    wait=false;
}

//Stop the game
function gameOver(){
    
    $("#title").text("Game over, your score: "+level);
    $("#over").text("Press SPACE to try again");
    $("body").addClass("incorrect");
    gameStarted = false;
}

//Animate button style
function animateButton(target){
    $(target).animate({opacity: 0.5}).animate({opacity: 1}); 
}

//Animate game pattern 
function animateGamePattern(target) {   
    setTimeout(function() {  
        animateButton(target[i]);
        i++;                    

        if (i < target.length) {         
            wait=true;  
            animateGamePattern(target);            
        }  else{
            setTimeout(function () {
                wait=false;
                if (!wait) {
                    $("#title").css("color",'purple');
                }
              }, 800);
        }     
    }, 1000)

}

//Reset data
function reset() {
    gamePattern = [];
    userPattern = [];
    level = 0;
    $("body").removeClass("incorrect");
    $("#over").text("");
    wait=false;
}