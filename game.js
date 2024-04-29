let gamePattern=[];
let buttonColors=["red", "blue", "green", "yellow"]
let userClickedPattern=[];
var level = 0
var gameStarted = false;

$(document).keypress(function(){
    if(!gameStarted){
        $("#level-title").text("Level "+ level);
        nextSequence();
        gameStarted=true;
    }
});

$(".btn").click(function(){
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1)
   })

   function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    }
    else{
        $("#level-title").html("Game Over,Press Any Key to Restart");
        var audio2 = new Audio("sounds/wrong.mp3");
        audio2.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
        }
};

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.floor(Math.random()*4)
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor); 
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColor);
}

function playSound(name){
    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(CurrentColor){
    $("#"+ CurrentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+CurrentColor).removeClass("pressed");
    },100);
}

function startOver(){
   level=0;
   gamePattern=[];
   gameStarted= false;
}
