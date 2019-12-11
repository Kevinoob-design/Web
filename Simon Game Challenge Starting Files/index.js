var level = 0;
var count = 0;
var progress = [];
var responseProgress = [];

document.addEventListener("keypress", start);

function start() {

    var randomValue = Math.floor(Math.random() * 4);
    var id = document.querySelectorAll(".btn")[randomValue].id
    
    progress.push(id);

    $("."+id).addClass("pressed");
    setInterval(function(){ $(".btn").removeClass("pressed"); }, 500);

    console.log(progress);

    document.removeEventListener("keypress", start);
}

function checkAnswer() {

    if(responseProgress[count] === progress[count]){
        
        count++;

        if (count === progress.length) {
            responseProgress = [];
            count = 0;

            setTimeout(function(){ start() }, 800);
            
        }
        console.log("true " + count);
    }
    else{
        console.log("false");

        $("body").addClass("game-over");
        setInterval(function(){ $("body").removeClass("game-over"); }, 200);
        var sound = new Audio("sounds/wrong.mp3");
        sound.play();

        setTimeout(function(){ restartGame(); }, 800);
    }
}

$(".btn").click(function() {

    var sound = new Audio("sounds/"+this.id+".mp3");
    sound.play();

    $(this).addClass("pressed");
    setInterval(function(){ $(".btn").removeClass("pressed"); }, 100);

    responseProgress.push(this.id)
    checkAnswer();
})

function restartGame() {
    count = 0;
    progress = [];
    responseProgress = [];
    start();
}