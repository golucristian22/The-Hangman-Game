"use strict";

// Selecting
const wordsContainer = document.querySelector(".word-container");
const lives = document.querySelector(".lives");

const keyboard = document.querySelector(".keyboard");
const reset = document.querySelector(".reset");

// Starting
let letter = "";
let alphabet = ["a", "b", "c" ,"d", "e", "f", "g" ,"h", "i", "j", "k", "l", "m", "n" ,"o" , "p", "q", "r", "s" ,"t" ,"u" ,"v" ,"w" ,"x" , "y" ,"z"];
let hp = 10;
lives.textContent = `You have ${hp} lives.`;

const words = ["tokyo", "delhi", "shanghai", "paris", "berlin", "rome", "cairo", "dhaka", "mumbai", "beijing", "osaka", "milan", "athens", "munich", "rotterdam", "hamburg",
 "barcelona", "vienna", "prague", "copenhagen", "budapest", "madrid", "lisbon", "bucharest", "warsaw", "london", "valencia", "seville", "lyon", "wroclaw", "krakow", "dublin",
  "cologne", "riga", "turin", "genoa", "palermo", "belgrade", "marseille", "zagreb", "sofia", "bilbao", "stockholm", "helsinki", "amsterdam", "bremen", "hanover", "kyiv",
   "minsk", "naples", "zaragoza", "vilnius", "frankfurt", "florence"];
let chosenWord;
let choseWord = () => {
    chosenWord = [...words[Math.floor(Math.random()*words.length)]];
    console.log(chosenWord);
};
choseWord();

// General Functions
function disableKeys(){
    const allKeys = document.querySelectorAll(".key");
    allKeys.forEach(el => el.classList.add("disabled"));
};

function enableKeys() {
    const allKeys = document.querySelectorAll(".key");
    allKeys.forEach(el => {
        el.classList.remove("disabled");
        el.classList.remove("correct");
    });   
}

function removeWord() {
    let wordContainers = document.querySelectorAll(".word");
    wordContainers.forEach(word => {
        wordsContainer.removeChild(word);
    })
}


// Generate Random Word Container
function finalWord(word) {
    for (let wordContainer of word) {
        letter = document.createTextNode(`${wordContainer}`);;
        let letterContainer = document.createElement("p");
        letterContainer.classList.add("word-letter");
        letterContainer.appendChild(letter)

        wordContainer = document.createElement("div");
        wordContainer.classList.add("word");
        wordContainer.appendChild(letterContainer);
        wordsContainer.appendChild(wordContainer);
    }
}
 
// Guess Mechanics
function checkDisplay(items){
    let itemLetter = items.length;
    items.forEach(item =>{
        if(item.classList.contains("display")){
            itemLetter--;
            if(itemLetter <= 0) {
                lives.textContent = `You Win, Well Done!`
                disableKeys();
            }
        }
    })        
}

function guess() {
    if(hp > 1){
        let guessLetter = this.textContent;
        if(!chosenWord.includes(guessLetter)){
            hp--;
            lives.textContent = `You have ${hp} lives.`;
            this.classList.add("disabled");
        } else {
            this.classList.add("correct")
            const letters = document.querySelectorAll(".word-letter");
            letters.forEach(el => {
                if(el.textContent == guessLetter){
                    el.classList.add("display");
                    checkDisplay(letters);
                }
            })
        }     
    } else {
        lives.textContent = `You lost! Better luck next time!`;
        disableKeys();
    }
}

// Create Keys
function createKeys(keys) {
    for(let key of keys){
        let keyValue = document.createTextNode(`${key}`);

        let keyContainer = document.createElement("div");
        keyContainer.classList.add("key");
        keyContainer.appendChild(keyValue);
        keyContainer.addEventListener("click", guess);
        keyboard.appendChild(keyContainer);

    }
}

// Reset Button 
reset.addEventListener("click", () => {
    removeWord();
    hp = 10;
    lives.textContent = `You have ${hp} lives.`;
    choseWord();
    finalWord(chosenWord);
    enableKeys();
})

finalWord(chosenWord);
createKeys(alphabet);
