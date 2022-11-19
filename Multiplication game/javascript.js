const checked = {
    tables: "",
    name: "",
    timed: "",
    repetitions: "",
    repetitionsDone: 0,
    lastNumber: 0,
}


function timedFunction() {
    if (checked.timed == "" || checked.timed === false) {
        checked.timed = true;
    }
    else {
        checked.timed = false;
    }
}


function startFunction() {
    tablesVariables();
    nameVariables();
    repVariables();
    console.log(checked.timed);
    var visibilityVar = "playing";
    var visibilityVar2 = "start";
    displayFunction(visibilityVar, visibilityVar2);
    repFunction();
}


// Create necessary variables to play
function tablesVariables() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    const tables = [];
    for (let index = 0; index < checkboxes.length; index++) {
        tables.push(checkboxes[index].value);
    }

    checked.tables = tables;

}


function nameVariables() { 
    checked.name = document.getElementById('input-name').value;
    console.log(checked.name);
}


function repVariables() {
    var repLength = document.querySelectorAll('[id^="rep-"]').length;
        for (let index = 0; index < repLength; index++) {  
            if (document.getElementById("rep-"+index).checked === true){
                checked.repetitions = document.getElementById("rep-"+index).value;
                console.log(checked.repetitions);
            }
        }
}


// Functions to show/hide the correct visual elements
function highscoresFunction(){
    var visibilityVar = "highscores";
    var visibilityVar2 = "start";
    displayFunction(visibilityVar, visibilityVar2);
}


function resetPlaying(){
    var visibilityVar = "start";
    var visibilityVar2 = "playing";
    displayFunction(visibilityVar, visibilityVar2);
}


function resetHighscores(){
    var visibilityVar = "start";
    var visibilityVar2 = "highscores";
    displayFunction(visibilityVar, visibilityVar2);
}


function displayFunction(visibilityVar, visibilityVar2) {
    document.getElementById(visibilityVar2+"Header").style.display = "none";
    document.getElementById(visibilityVar2+"Main").style.display = "none";
    document.getElementById(visibilityVar+"Header").style.display = "inherit";
    document.getElementById(visibilityVar+"Main").style.display = "inherit";
    console.log(visibilityVar);
    console.log(visibilityVar2);
    
}


function repFunction(){
    // Keep track of how many repetitions to calculate
    if (checked.repetitionsDone < checked.repetitions){
        checked.repetitionsDone += 1;
        console.log(checked.repetitionsDone);
        calculateNumber();
    }
    else {
        checked.repetitionsDone = "";
    }
    
}


function calculateNumber(){
    // Generate math problem
    var table = checked.tables[Math.floor(Math.random()*checked.tables.length)];
    var times = Math.floor(Math.random() * 11);
    var number = table * times;
    if  (number == checked.lastNumber){
        console.log("test");
        calculateNumber();
    }

    console.log(times+" times");
    checked.lastNumber = number;
    console.log(table+" table")    
    console.log(number+" number");
    console.log(checked.lastNumber+" last number");
    solveNumber(table, times, number);
}


function solveNumber(table, times, number){
    var pressedKeys = 0;
    document.getElementById("solveTable").innerHTML = table;
    document.getElementById("solveTimes").innerHTML = times;
    if (pressedKeys < number.length) {
        document.addEventListener("keyup", ) 
    }
}