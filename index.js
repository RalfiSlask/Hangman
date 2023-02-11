const letters = document.querySelectorAll(".letter");
const button = document.querySelector(".button");
const endtext = document.querySelector(".text");
const guesspanel = document.querySelector(".guesses");

// The hangman variables //

const lowerPole = document.querySelector(".lowerPole");
const midPole = document.querySelector(".midPole");
const higherPole = document.querySelector(".higherPole");
const noose = document.querySelector(".noose");
const head = document.querySelector(".head");
const mouth = document.querySelector(".mouth");
const legLeft = document.querySelector(".leg-left");
const legRightight = document.querySelector(".leg-right");
const armLeft = document.querySelector(".arm-left");
const armRight = document.querySelector(".arm-right");
const mainbody = document.querySelector(".main-body");
const hangparts = document.querySelectorAll(".hang-part");

// music and exit buttons //

let sounds = document.querySelector(".sound");
let exit = document.querySelector(".exit");
let sound_image = document.querySelector(".sound-image");

// music settings //

let BGmusic = new Audio("./Sounds/music.mp3")
BGmusic.volume = 0.1;
let laugh = new Audio("./Sounds/laugh.mp3");
laugh.volume = 0.3;
let winning = new Audio("./Sounds/winning.mp3");
winning.volume = 0.3;
let win = new Audio("./Sounds/win.mp3");
win.volume = 0.1;

// Game has ended variable //

let isGamePlaying = true;

// setting up counters //

let count = 0;
let errorCount = 0;
let winCount = 0;

// generating an array with a random word in it //

let randNumber = Math.floor(Math.random() * 10);
let randArray = [];
let words = ["PHENOMENON", "ABRUPTLY", "BUFFALO", "IVORY", "VOODOO", "MATRIX", "BIKINI", "BANJO", "PUPPY", "JOGGING", "AXIOM", "ZOMBIE", "STRONGHOLD"];
let word;

const generateArray = () => {
    randNumber = Math.floor(Math.random() * 10);
    for(let i = 0; i < words.length; i++) {
        word = words[randNumber];
       
    }  
    for(let y = 0; y < word.length; y++) {
        randArray.push(word[y]);
    }
}

generateArray();

window.onload = () => {
    setTimeout(BGmusic.play(), 2000)
    BGmusic.loop = true;
}

// adding elements for each letter in the random word //

const addingGuesses = () => {
    for(let i = 0; i < randArray.length; i++) {
        const div = document.createElement("div");
        div.classList.add("guess");
        guesspanel.appendChild(div);
    } 
}

addingGuesses();

let guesses = document.querySelectorAll(".guess");

// when pressing on the letters //

for(let y = 0; y < letters.length; y++) {
    letters[y].onclick = () => {
        if(letters[y].classList.contains("taken") == false && isGamePlaying == true) {
            for(let i = 0; i < randArray.length; i++) {
                if(randArray[i] == letters[y].innerHTML) {
                    letters[y].classList.add("taken");
                    guesses[i].innerHTML = randArray[i];
                    winCount++
                    letters[y].style.backgroundColor = "#006400";
                } 
            } 
            if(randArray.includes(letters[y].innerHTML) == false){
                letters[y].classList.add("taken");
                letters[y].style.backgroundColor = "#8a0303";
                errorCount++  
            } 
    
            // effects happening when the user wins the game //
    
            if(winCount == randArray.length) {
                count = 2;
                endtext.classList.remove("hidden");
                endtext.classList.remove("end-text");
                endtext.classList.add("winning-text");
                button.classList.remove("hidden");
                endtext.innerHTML = "You Win!"
                BGmusic.pause();
                setTimeout(win.play(), 1500)
                winning.play();
                mouth.classList.remove("mouth-sad");
                mouth.classList.add("mouth-smiling");
                isGamePlaying = false;
            }
    
            // making the hangman visible after clicking on the wrong letters //
    
            if(errorCount == 1) {
                lowerPole.style.visibility = "visible";
                midPole.style.visibility = "visible";
                higherPole.style.visibility = "visible";
            } else if(errorCount == 2) {
               noose.style.visibility = "visible"
            } else if(errorCount == 3) {
                head.style.visibility = "visible"
            } else if(errorCount == 4) {
                mainbody.style.visibility = "visible";
            } else if(errorCount == 5) {
                armLeft.style.visibility = "visible";
            } else if(errorCount == 6) {
                armRight.style.visibility = "visible";
            } else if(errorCount == 7) {
                legLeft.style.visibility = "visible";
            } else if(errorCount == 8) {
                legRight.style.visibility = "visible";
    
                // effects happening when the user loses the game //
    
                laugh.play();
                endtext.innerHTML = "You Lose!"
                endtext.classList.remove("hidden");
                endtext.classList.remove("winning-text");
                endtext.classList.add("end-text");
                button.classList.remove("hidden");
                mouth.classList.add("mouth-sad");
                mouth.classList.remove("mouth-smiling");
                isGamePlaying = false;
            } 
        }
        
}
}

// removing all children of the guesses node //

const removeChildren = () => {
    while(guesspanel.firstChild) {
        guesspanel.removeChild(guesspanel.firstChild);
    }
}

// when clicking on the try again button and restarting the game //

button.onclick = () => {
    win.pause();
    BGmusic.play();
    BGmusic.loop = true;
    removeChildren();
    randArray = []
    generateArray();
    addingGuesses();
    guesses = document.querySelectorAll(".guess");
    count = 0;
    errorCount = 0;
    winCount = 0;
    isGamePlaying = true;
    endtext.classList.add("hidden");
    endtext.classList.remove("end-text");
    button.classList.add("hidden");
    hangparts.forEach(hangpart => {
        hangpart.style.visibility = "hidden";
    })
    letters.forEach(letter => {
        letter.style.backgroundColor = "gray";
        letter.classList.remove("taken");
    })
    guesses.forEach(guess => {
        guess.innerHTML = "";
    })
}

// when clicking on the sound and exit icons //

sounds.onclick = () => {
        if(count == 0 && BGmusic.paused == false) {
            sound_image.src = "./Images/sound-off.png";
            BGmusic.pause();
            count = 1;
        } else if(count == 1 && BGmusic.paused == true) {
            sound_image.src = "./Images/soundon.png";
            BGmusic.play();
            count = 0;
        } else if(count == 2 && win.paused == false) {
            sound_image.src = "./Images/sound-off.png";
            win.pause();
            count = 3;
        } else if(count == 3 && win.paused == true) {
            sound_image.src = "./Images/soundon.png";
            win.play();
            count = 2;
        }
}

// when clicking on the exit button //

exit.onclick = () => {
    window.close();
}

