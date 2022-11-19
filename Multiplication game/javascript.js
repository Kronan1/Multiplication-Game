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


function timedFunction() {
    if (checked.timed == "" || checked.timed === false) {
        checked.timed = true;
        console.log("True");
    }
    else {
        checked.timed = false;
        console.log("False");
    }
}


function startFunction() {
    resetFunction();
    tablesVariables();
    nameVariables();
    repVariables();
    console.log(checked.timed);
    displayFunction("playing", "start");
    document.getElementById("numberField").focus();
    repFunction();
}


// Create necessary variables to play
function tablesVariables() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
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
    document.getElementById(visibilityVar2+"Header").style.display = "none";
    document.getElementById(visibilityVar2+"Main").style.display = "none";
    document.getElementById(visibilityVar+"Header").style.display = "inherit";
    document.getElementById(visibilityVar+"Main").style.display = "inherit";
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
    if  (checked.number == checked.lastNumber){
        console.log("test");
        //calculateNumber(); Recursion not working properly
        calculateNumber();
    }

    checked.lastNumber = checked.number;
    document.getElementById("solveTable").innerHTML = table;
    document.getElementById("solveTimes").innerHTML = times;
}

function pressedH(){

    var numberLength = String(checked.number).length;
    var textbox = String(document.getElementById("numberField").value);
    textbox = textbox.replace(/\D/g, '');
    document.getElementById("numberField").value = textbox;
    var answer = parseInt(textbox);
    if (textbox.length > numberLength){
        document.getElementById("numberField").value = "";
        numberLength = textbox.length;
    }
    /*
    textbox = textbox.charAt(textbox.length - 1);
    if (!containsNumbers(textbox)){
        console.log("Not a Number");
        document.getElementById("numberField").value = checked.pressedKeys;
        return;
    }
    */
    if (textbox.length === numberLength){
        if (checked.number === answer){
            checked.rightAnswers += 1;
            console.log(checked.rightAnswers+" correct");
            repFunction();
        }
        else {
            console.log("FEL");
            document.getElementById("numberField").value = "";
            repFunction();
        }
        
    }

    
}

function containsNumbers(str) {
    return /[0-9]/.test(str);
  }


function resetFunction() {
    checked.number = 0;
    checked.pressedKeys = "";
    checked.rightAnswers = 0;
    checked.repetitionsDone = 0;
    checked.lastNumber = -1;
}


function scoreScreen() {
    var mistakes = checked.repetitionsDone - checked.rightAnswers;
    document.getElementById("scoreScreenCorrect").innerHTML = (checked.rightAnswers+"/"+checked.repetitionsDone)
    displayFunction("scoreScreen", "playing");
}


function resetScoreScreen() {
    displayFunction("start", "scoreScreen");
}


function tryAgain() {
    resetFunction();
    displayFunction("playing", "scoreScreen");
    document.getElementById("numberField").focus();
    repFunction();
}
//id="scoreScreenScore"