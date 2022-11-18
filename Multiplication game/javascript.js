const checked = {
    tables: "",
    name: "",
    timed: "",
    repetitions: "",
    repetitionsDone: 0,
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

function highscoresFunction(){
    var visibilityVar = "highscores";
    var visibilityVar2 = "start";
    displayFunction(visibilityVar, visibilityVar2);
}


function resetFunction(){
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
    var table = checked.tables[Math.floor(Math.random()*checked.tables.length)];
    var number = table * (Math.floor(Math.random() * 11));
    // If same number twice in a row generate new number (not working!)
    if  (number == lastNumber){
        console.log("test");
        calculateNumber();
        
    }


    var lastNumber = number;
    
    console.log(table+" table")    
    console.log(number+" number");
    console.log(lastNumber+" last number");
}
