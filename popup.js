// Initialize button with user's preferred color
let bangElement = document.getElementById("bang");
let wordElement = document.getElementById("word");
let whackerElement = document.getElementById("whacker");
let wackItElement = document.getElementById("wack-it");
let numberElement = document.getElementById("number");
let resetElement = document.getElementById("reset");
let number = 0;
let context = new AudioContext();

let value = localStorage.getItem("number");
console.info("Local storage: " + value);
setTimeout(function() {
// chrome.storage.sync.get("number", ({ value }) => {
    if (value == null || typeof value == 'undefined') {
        value = "0";
    }

    number = parseInt(value);

    numberElement.innerText = number;
// });
}, 100);

wackItElement.addEventListener("click", async () => {

    bangElement.classList.remove("bang-" + (number % 12 + 1));
    whackerElement.classList.add("hit");
    beep();

    localStorage.setItem("number", ++number + "");
    console.info("Local storage value set to : " + localStorage.getItem("number"));
    // chrome.storage.sync.set({"number": ++number}, function() {
        bangElement.classList.add("bang-" + (number % 12 + 1));

        numberElement.innerText = number;
        setTimeout(function () {
            whackerElement.classList.remove("hit");
        }, 100);
        setTimeout(function () {
            bangElement.classList.remove("bang-" + (number % 12 + 1));
        }, 250);
    // });
});

wordElement.addEventListener("click", async (ev) => {
    ev.stopPropagation();
});

resetElement.addEventListener("click", async (ev) => {
    number = 0;
    numberElement.innerText = number;
    localStorage.setItem("number", number + "");
    ev.stopPropagation();
});

function beep() {
    let o = context.createOscillator();
    let g = context.createGain();
    o.type = "sawtooth";
    o.connect(g);
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.5);
}
