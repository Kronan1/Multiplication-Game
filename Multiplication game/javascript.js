const checked = {
    tables: [],
    name: "",
    timed: "",
    repetitions: 0,
    repetitionsDone: 0,
    lastNumber: 0,
    number: 0,
    pressedKeys: "",
    rightAnswers: 0,
}


const timer = {
    timerStart: 0,
}

const results = {
    word: "",
    score: 0,

}


function timedFunction() {
    if (!checked.timed === "true") {
        checked.timed = "true";
        console.log("True");
    }
    else {
        checked.timed = "";
        console.log("False");
    }
}


function startFunction() {
    resetFunction();
    
    if (tablesVariables() === false) {
        return 1;
    }
    nameVariables();
    repVariables();
    timedFunction();
    displayFunction("playing", "start");
    timer.timerStart = Date.now();
    document.getElementById("numberField").focus();
    repFunction();
}


// Create necessary variables to play
function tablesVariables() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length == 0) {
        console.log("ZeroCheckbox");
        return false;
    }
    const tables = [];
    for (let index = 0; index < checkboxes.length; index++) {
        var tablePush = parseInt(checkboxes[index].value);
        tables.push(tablePush);
        console.log(tablePush);
    }

    checked.tables = tables;
    console.log(checked.tables);

}


function nameVariables() { 
    checked.name = document.getElementById('input-name').value;
    console.log(checked.name);
}


function repVariables() {
    var repLength = document.querySelectorAll('[id^="rep-"]').length;
        for (let index = 0; index < repLength; index++) {  
            if (document.getElementById("rep-"+index).checked === true){
                checked.repetitions = parseInt(document.getElementById("rep-"+index).value);
                console.log(checked.repetitions);
            }
        }
}


// Functions to show/hide the correct visual elements
function highscoresFunction(){
    displayFunction("highscores", "start");
}


function resetPlaying(){
    displayFunction("start", "playing");
}


function resetHighscores(){
    displayFunction("start", "highscores");
}


function displayFunction(visibilityVar, visibilityVar2) {
    console.log(document.getElementById("startMain").style.display);
    console.log(document.getElementById("playingMain").style.display);
    document.getElementById(visibilityVar2+"Header").style.display = "none";
    document.getElementById(visibilityVar2+"Main").style.display = "none";
   
    if (visibilityVar === "start") {
        document.getElementById(visibilityVar+"Header").style.display = "flex";
        document.getElementById(visibilityVar+"Main").style.display = "flex";
    } else {
        document.getElementById(visibilityVar+"Header").style.display = "initial";
        document.getElementById(visibilityVar+"Main").style.display = "initial";
    }
    
    console.log(visibilityVar);
    console.log(visibilityVar2);
}


function repFunction(){
    // Keep track of how many repetitions to calculate
    document.getElementById("numberField").value = "";
    if (checked.repetitionsDone < checked.repetitions){
        checked.repetitionsDone += 1;
        calculateNumber();
    }
    else {
        scoreScreen();
    }
    
}


function calculateNumber(){
    // Generate math problem
    var table = checked.tables[Math.floor(Math.random()*checked.tables.length)];
    var times = Math.floor(Math.random() * 11);
    checked.number = table * times;
    
    solveNumber(table, times);
}


function solveNumber(table, times){
    if  (checked.number === checked.lastNumber){
        console.log("Same number");
        //calculateNumber(); Recursion not working properly
        calculateNumber();
    }
    else {
        console.log(checked.number+" Checked number");
        checked.lastNumber = checked.number;
        document.getElementById("solveTable").innerHTML = table;
        document.getElementById("solveTimes").innerHTML = times;
    }
}

function pressedH(){

    var numberLength = String(checked.number).length;
    var textbox = String(document.getElementById("numberField").value);
    textbox = textbox.replace(/\D/g, '');
    document.getElementById("numberField").value = textbox;
    var answer = parseInt(textbox);

    if (textbox.length > numberLength){
        // Defense against number spamming
        document.getElementById("numberField").value = "";
        numberLength = textbox.length;
    }

    if (textbox.length === numberLength){
        if (checked.number === answer){
            checked.rightAnswers += 1;
            console.log(checked.rightAnswers+" correct");
            console.log(answer+" Correct Answer");
            repFunction();
        }
        else {
            console.log("FEL");
            document.getElementById("numberField").value = "";
            repFunction();
        }
        
    }

    
}


function resetFunction() {
    checked.number = 0;
    checked.rightAnswers = 0;
    checked.repetitionsDone = 0;
    checked.lastNumber = -1;
    results.score = 0;
    results.word = "";
}


function scoreScreen() {
    calculateScore();
    console.log(results.score);    
    scoreScreenWord();
    console.log(results.word);
    document.getElementById("scoreScreenWord").innerHTML = results.word;
    document.getElementById("scoreScreenScore").innerHTML = results.score;
    document.getElementById("scoreScreenCorrect").innerHTML = checked.rightAnswers + "/" + checked.repetitions;
    displayFunction("scoreScreen", "playing");
}


function resetScoreScreen() {
    displayFunction("start", "scoreScreen");
}


function tryAgain() {
    resetFunction();
    displayFunction("playing", "scoreScreen");
    document.getElementById("numberField").focus();
    timer.timerStart = Date.now();
    repFunction();
}

function scoreScreenWord() {
    if (checked.rightAnswers === checked.repetitions){
        word = "Perfect";
    }
    else if (checked.rightAnswers > (checked.repetitions * 0.8)){
        word = "Great";
    }
    else {
        word = "Good";
    }
    results.word = word;
}

function calculateScore() {
    let elapsedTime = (((Date.now() - timer.timerStart)/100) / checked.repetitions); 
    var score = (checked.rightAnswers / checked.repetitions) * 1000;
    score -= (elapsedTime * 10);
    if (score > 0){
        results.score = Math.round(score);
    }
    else {
        results.score = 1;
    }   
}
//id="scoreScreenScore"
/*
var score = (checked.rightAnswers / checked.repetitions) * 1000;
var repetitions = (checked.rightAnswers / checked.repetitions) * 1;
var difficulty = vilka tabeller + adde / antal tabeller
*/