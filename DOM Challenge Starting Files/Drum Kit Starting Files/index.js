document.querySelectorAll(".drum").forEach(element => {
    element.addEventListener("click", function(){

        playSound(element.classList[0]);
    });
});

document.addEventListener('keydown', function (event) {

    playSound(event.key);
});

function playSound(key){


    element = document.querySelector("."+key)

    if(element != null){
        var audio = new Audio("sounds/" + element.id + ".mp3");
        audio.play();

        element.classList.add("pressed");

        setTimeout(function(){
            element.classList.remove("pressed");
        }, 100)
    }
}