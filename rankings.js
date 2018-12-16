const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

//Globals
var teams = [];
var row = [];
var table = document.createElement('table');
table.id = "rankingstable";


//Struct for teams storage
function team(number, name, notes, objective_score, consistency, driver_skill, issues, created_at, updated_at, autonomous) {
    this.number = number;
    this.name = name;
    this.notes = notes
    this.objective_score = objective_score;
    this.consistency = consistency;
    this.driver_skill = driver_skill;
    this.issues = issues;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.autonomous = autonomous;
}

//Makes header of table (with sort buttons)
function drawHeader() {
    row.push(table.insertRow(0));
    numberCell = row[0].insertCell(0);
    numberCell.innerHTML = '<input type = "button" value = "Team Number" id = numberButton onclick = "teams.sort(compareNumber); refreshTable()"></input>';
    nameCell = row[0].insertCell(1);
    nameCell.innerHTML = '<input type = "button" value = "Team Name" id = nameButton onclick = "teams.sort(compareName); refreshTable()"></input>';
    notesCell = row[0].insertCell(2);
    notesCell.innerHTML = "Notes";
    objectiveScoreCell = row[0].insertCell(3);
    objectiveScoreCell.innerHTML = '<input type = "button" value = "Objective Score" id = nameButton onclick = "teams.sort(compareObjectiveScore); refreshTable()"></input>';
    consistencyCell = row[0].insertCell(4);
    consistencyCell.innerHTML = '<input type = "button" value = "Consistency" id = nameButton onclick = "teams.sort(compareConsistency); refreshTable()"></input>';
    driverSkillCell = row[0].insertCell(5);
    driverSkillCell.innerHTML = '<input type = "button" value = "Driver Skill" id = nameButton onclick = "teams.sort(compareDriverSkill); refreshTable()"></input>';
    autonomousCell = row[0].insertCell(6);
    autonomousCell.innerHTML = '<input type = "button" value = "Autonomous" id = nameButton onclick = "teams.sort(compareAutonomous); refreshTable()"></input>';
    issuesCell = row[0].insertCell(7);
    issuesCell.innerHTML = "Issues";
}

//Draws "body" of table
function drawTable() {
    var i, len, j = 0;
    for (i = 1, len = teams.length; i <= len; ++i) {
        row.push(table.insertRow(i));
        numberCell = row[i].insertCell(0);
        numberCell.innerHTML = teams[j].number;
        nameCell = row[i].insertCell(1);
        nameCell.innerHTML = teams[j].name;
        notesCell = row[i].insertCell(2);
        notesCell.innerHTML = teams[j].notes;
        objectiveScoreCell = row[i].insertCell(3);
        objectiveScoreCell.innerHTML = teams[j].objective_score;
        consistencyCell = row[i].insertCell(4);
        consistencyCell.innerHTML = teams[j].consistency;
        driverSkillCell = row[i].insertCell(5);
        driverSkillCell.innerHTML = teams[j].driver_skill;
        autonomousCell = row[i].insertCell(6);
        autonomousCell.innerHTML = teams[j].autonomous;
        issuesCell = row[i].insertCell(7);
        issuesCell.innerHTML = teams[j].issues;
        j++;
    }
    container.appendChild(table);
}

//Cycles through rows and updates each cell with sorted information
function refreshTable() {
    var i, j = 0;
    for (i = 1; i <= teams.length; ++i) {

        row[i].cells[0].innerHTML = teams[j].number;
        row[i].cells[1].innerHTML = teams[j].name;
        row[i].cells[2].innerHTML = teams[j].notes;
        row[i].cells[3].innerHTML = teams[j].objective_score;
        row[i].cells[4].innerHTML = teams[j].consistency;
        row[i].cells[5].innerHTML = teams[j].driver_skill;
        row[i].cells[6].innerHTML = teams[j].autonomous;
        row[i].cells[7].innerHTML = teams[j].issues;
        j++;

    }
}


function compareNumber(a, b) {
    console.log("compare number run");
    return a.number - b.number;
}

function compareName(a, b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

function compareObjectiveScore(a, b) {
    return b.objective_score - a.objective_score;
}

function compareConsistency(a, b) {
    return b.consistency - a.consistency;
}

function compareDriverSkill(a, b) {
    return b.driver_skill - a.driver_skill;
}

function compareAutonomous(a, b) {
    return b.autonomous - a.autonomous;
}

/*function compareUpdatedAt(a, b) {
    return a.updated_at - b.updated_at;
}*/


app.appendChild(container);

//Access API
var request = new XMLHttpRequest();
request.open('GET', 'https://frscout.herokuapp.com/api/v1/teams', true);
request.onload = function () {

    // Begin accessing JSON data here
    var retrieved = JSON.parse(this.response);
    if (request.status = "SUCCESS") {
        var i = 0;

        retrieved.data.forEach(group => {

            //Push to team array
            teams.push(new team(
                retrieved.data[i].number,
                retrieved.data[i].name,
                retrieved.data[i].notes,
                retrieved.data[i].objective_score,
                retrieved.data[i].consistency,
                retrieved.data[i].driver_skill,
                retrieved.data[i].issues,
                retrieved.data[i].created_at,
                retrieved.data[i].updated_at,
                retrieved.data[i].autonomous,
            ));
            i++;
        });


        //Draw table and add to page
        drawHeader();
        drawTable();
        container.appendChild(table);



    }
}
request.send();
