
const letters = "abcdefghijklmnopqrstuvwxyz";
let lettersContainer = document.querySelector(".letters");
// for(let i = 0; i< letters.length; i++) {
//     let node = document.createElement("span");
//     node.innerHTML = letters[i];
//     node.className = "letters-box";
//     lettersContainer.appendChild(node);
// }

let arrayLetters = Array.from(letters);
arrayLetters.forEach((el) => {
    let span = document.createElement("span");
    let theEl = document.createTextNode(el);
    span.appendChild(theEl);
    span.className = "letters-box";
    lettersContainer.appendChild(span);
});

// Object of categories + words
let word = {
    programming: ["javascript", "php", "python", "rust", "mysql"],
    movies: ["Memento", "Jaws", "Hitch", "Frozen", "Matrix", "Gravity", "Avatar", "Snatch", "Brick", "Amelie"],
    people:  ["Elon Musk", "Tom Cruise", "Adele", "Coco Chanel", "Shakira", "Marilyn Monroe", "Bruce Lee", "Elvis Presley", "Usain Bolt", "Dalai Lama"],
    countries: ["Egypt", "Lebanon", "Jordan", "Kuwait", "Bahrain", "Oman", "Sudan"]
}

// get random property 
let property = Object.keys(word);
let randomProperty = Math.floor(Math.random() * property.length);
let randomPropertyValue = property[randomProperty]
let value = word[property[randomProperty]];
let randomValue = Math.floor(Math.random() * value.length);
let randomValueValue = value[randomValue]
console.log(randomPropertyValue);
console.log(randomValueValue);

// set category info
let title = document.querySelector(".word span");
let text = document.createTextNode(randomPropertyValue);
title.appendChild(text);


// letters guess 
let letterGuessContainer = document.querySelector(".letters-guess");
let letterAndSpace = Array.from(randomValueValue);
let numSpam = 0;
letterAndSpace.forEach((el) => {
    let span = document.createElement("span");
    numSpam ++;
    if(numSpam > 6) {
        letterGuessContainer.style = "padding: 18px 0 100px;";
    }
    if(el === " ")
        span.className = "with-space";
    letterGuessContainer.appendChild(span);
})
// for (let i = 0; i < randomValueValue.length; i++) {
//     let span = document.createElement("span");
//     span.className = "letter-guess";
//     letterGuessContainer.appendChild(span);
// }


// handle click on letter
let guessSpan = document.querySelectorAll(".letters-guess span");


// set wrong attempt
let wrongAttempt = 0;
// get the draw
let theDraw = document.querySelector(".hangman-draw");
let numOfSpan = 0;
document.addEventListener("click", (e) => {
    let theStatus = false;
    if(e.target.className === "letters-box") {
        e.target.classList.add("clicked");
        let theLetter = e.target.innerHTML;
        let theChosenWorld = Array.from(randomValueValue.toLowerCase());
        theChosenWorld.forEach((el, worldIndex) => {
            if(theLetter === el){
                theStatus =true;
                guessSpan.forEach((element, index) => {
                    if(index === worldIndex){
                        element.innerHTML = theLetter;
                        numOfSpan++;
                    }
                })
                if(numOfSpan === randomValueValue.length) {
                    endGame(false);
                }
            }
            
        });


        if(theStatus === false) {
            wrongAttempt++;
            theDraw.classList.add(`wrong-${wrongAttempt}`);
            document.getElementById("fail").play();
            if(wrongAttempt === 7) {
                lettersContainer.classList.add("finished");
                endGame(true);
            }
        }else {
            document.getElementById("success").play();
        }
    }
});

let btn = document.querySelector(".btn button");
function endGame (st) {
    let div =document.createElement("div");
    if(st) {
        div.innerHTML = `You lose the game the world is <span>${randomValueValue}</span>`;
    }else {
        div.innerHTML = "You win";
    }
    div.className = "title";
    btn.style = "display: block";
    btn.parentElement.prepend(div);
}
btn.onclick = function () {
    location.reload();
}