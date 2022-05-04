"use strict";

// Selecting
const wordsContainer = document.querySelector(".word-container");
const lives = document.querySelector(".lives");
const keyboard = document.querySelector(".keyboard");
const reset = document.querySelector(".reset");

const category = document.getElementById("category");

// Starting
let finalWord;
let alphabet = ["a", "b", "c" ,"d", "e", "f", "g" ,"h", "i", "j", "k", "l", "m", "n" ,"o" , "p", "q", "r", "s" ,"t" ,"u" ,"v" ,"w" ,"x" , "y" ,"z"];
let hp = 10;
lives.textContent = `You have ${hp} lives.`;

const animalsWords = ["alligator", "ano", "fox", "hare", "wolf", "armadillo", "elephant", "bear", "dog", "cat", "baboon", "buffalo", "mastiff", "shark", "terrier", "bulldog",
 "bullfrog", "bee", "butterfly", "caiman", "lizzard", "camel", "capybara", "caracal", "cassowary", "donkey", "drever", "duck", "dunker", "dugong", "eagle", "earwig", "gorilla", 
 "seal", "penguin", "tamarin", "fish", "flamingo", "flounder", "squirrel", "cichild", "chipmunk", "chinchilla", "cimpanzee", "chihuahua", "chicken", "owl", "avocet"];

const citiesWords = ["tokyo", "delhi", "shanghai", "paris", "berlin", "rome", "cairo", "dhaka", "mumbai", "beijing", "osaka", "milan", "athens", "munich", "rotterdam", "hamburg",
 "barcelona", "vienna", "prague", "copenhagen", "budapest", "madrid", "lisbon", "bucharest", "warsaw", "london", "valencia", "seville", "lyon", "wroclaw", "krakow", "dublin",
"cologne", "riga", "turin", "genoa", "palermo", "belgrade", "marseille", "zagreb", "sofia", "bilbao", "stockholm", "helsinki", "amsterdam", "bremen", "hanover", "kyiv",
"minsk", "naples", "zaragoza", "vilnius", "frankfurt", "florence"];

const clothesWords = ["tshirt", "sweater", "jacket", "coat", "jeans", "socks", "shorts", "tracksuit", "vest", "pajamas", "shoes", "boots", "raincoat", "tanktop", "swimsuit", 
"skirt", "dress", "heels", "blouse", "bra", "panties", "stockings", "suit", "shirt", "tie", "bowtie", "briefs", "scarft", "belt", "handkerchief", "necklace", "purse", "hat", "cap", 
"watch", "shawl"];

const foodWords = ["nigiri", "sarma", "pizza", "yogurt", "eclair", "bruschetta", "churros", "soup", "milkshake", "tiramisu", "penne", "macaroni", "baguette", "egg", "doughnut",
"quesadilla", "guacamole", "hummus", "wasabi", "burrito", "pasta", "nachos", "brownies", "ricotta", "lasagna", "cheddar", "barbecue", "cheeseburger", "mozzarella", "spaghetti",
"tortilla", "croissant", "tofu", "noodles", "ramen", "tacos", "burger", "sushi", "salad", "sandwich", "bread", "steak", "fish", "rice", "cheese", "sausages", "milk", "cookie", "pie",
"cupcake", "shrimp"];

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
function createRandomWord(word) {
    for (let wordContainer of word) {
        let letter = document.createTextNode(`${wordContainer}`);;
        let letterContainer = document.createElement("p");
        letterContainer.classList.add("word-letter");
        letterContainer.appendChild(letter)

        wordContainer = document.createElement("div");
        wordContainer.classList.add("word");
        wordContainer.appendChild(letterContainer);
        wordsContainer.appendChild(wordContainer);
    }
}
 
let choseWord = function(categoryName){
    let chosenWord = [...categoryName[Math.floor(Math.random()*categoryName.length)]];
    finalWord = chosenWord;
    console.log(chosenWord);
    createRandomWord(chosenWord);
};

function setCategory() {
    removeWord();
    let categoryValue = category.value;
    console.log(categoryValue);
    if(categoryValue == "animals") categoryValue = animalsWords;
    else if(categoryValue == "cities") categoryValue = citiesWords;
    else if(categoryValue == "clothes") categoryValue = clothesWords;
    else if(categoryValue == "food") categoryValue = foodWords;

    choseWord(categoryValue);
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
    const letters = document.querySelectorAll(".word-letter");
    if(hp > 1){
        let guessLetter = this.textContent;
        if(!finalWord.includes(guessLetter)){
            hp--;
            lives.textContent = `You have ${hp} lives.`;
            this.classList.add("disabled");
        } else {
            this.classList.add("correct");       
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
        letters.forEach(el => {
            if(!el.classList.contains("display")) {
                el.classList.add("remaining");
            }
        })
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
    setCategory();
    hp = 10;
    lives.textContent = `You have ${hp} lives.`;
    enableKeys();
})

createKeys(alphabet);
