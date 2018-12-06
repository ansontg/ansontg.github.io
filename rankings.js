const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

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

function drawTable(row, teams, table) {
    console.log("draw table run");
    for (i = 1, len = teams.length; i < len; ++i) {
        row.push(table.insertRow(i));

        numberCell = row[i].insertCell(0);
        numberCell.innerHTML = teams[i].number;
        nameCell = row[i].insertCell(1);
        nameCell.innerHTML = teams[i].name;
        notesCell = row[i].insertCell(2);
        notesCell.innerHTML = teams[i].notes;
        objectiveScoreCell = row[i].insertCell(3);
        objectiveScoreCell.innerHTML = teams[i].objective_score;
        consistencyCell = row[i].insertCell(4);
        consistencyCell.innerHTML = teams[i].consistency;
        driverSkillCell = row[i].insertCell(5);
        driverSkillCell.innerHTML = teams[i].driver_skill;
        autonomousCell = row[i].insertCell(6);
        autonomousCell.innerHTML = teams[i].autonomous;
        issuesCell = row[i].insertCell(7);
        issuesCell.innerHTML = teams[i].issues;

    }

    container.appendChild(table);
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
    return a.objective_score - b.objective_score;
}

function compareConsistency(a, b) {
    return a.consistency - b.consistency;
}

function compareDriverSkill(a, b) {
    return a.driver_skill - b.driver_skill;
}

function compareAutonomous(a, b) {
    return a.autonomous - b.autonomous;
}

/*function compareUpdatedAt(a, b) {
    return a.updated_at - b.updated_at;
}*/

var teams = [];
var row = [];

//app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://frscout.herokuapp.com/api/v1/teams', true);
request.onload = function () {

    // Begin accessing JSON data here
    var retrieved = JSON.parse(this.response);
    if (request.status = "SUCCESS") {
        var i = 0;

        retrieved.data.forEach(group => {

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



        //teams.sort(compareNumber);

        var table = document.createElement('table');

        var i, len;



        row.push(table.insertRow(0));
        
        drawTable(row, teams, table);

        numberCell = row[0].insertCell(0);
        numberCell.innerHTML = '<input type = "button" value = "Team Number" id = numberButton onclick = "teams.sort(compareNumber); drawTable(table)"></input>';
        
        nameCell = row[0].insertCell(1);
        nameCell.innerHTML = '<input type = "button" value = "Team Name" id = nameButton onclick = "teams.sort(compareName); drawTable(table)"></input>';
        notesCell = row[0].insertCell(2);
        notesCell.innerHTML = "Notes";
        objectiveScoreCell = row[0].insertCell(3);
        objectiveScoreCell.innerHTML = "Objective Score";
        consistencyCell = row[0].insertCell(4);
        consistencyCell.innerHTML = "Consistency";
        driverSkillCell = row[0].insertCell(5);
        driverSkillCell.innerHTML = "Driver Skill";
        autonomousCell = row[0].insertCell(6);
        autonomousCell.innerHTML = "Autonomous";
        issuesCell = row[0].insertCell(7);
        issuesCell.innerHTML = "Issues";




    }
}
request.send();
