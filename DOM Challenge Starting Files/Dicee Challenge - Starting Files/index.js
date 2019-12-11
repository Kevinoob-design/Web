document.onload(getRandomArbitrary(1, 7))

function getRandomArbitrary(min, max) {

    var value1 = Math.floor(Math.random() * (max - min) + min);
    var value2 = Math.floor(Math.random() * (max - min) + min);

    document.querySelector(".img1").setAttribute("src", "images/dice"+value1+".png");
    document.querySelector(".img2").setAttribute("src", "images/dice"+value2+".png");

    if(value1 > value2){
        document.querySelector("h1").textContent = "Player 1 wins";
    }
    else if(value2 === value1){
        document.querySelector("h1").textContent = "both are equal!";
    }
    else{
        document.querySelector("h1").textContent = "Player 2 wins"; 
    }
}