const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

//Struct to hold teams
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

//Array of teams (sorted later)
var teams = [];

//Add container to page
app.appendChild(container);

var request = new XMLHttpRequest();

//Send request to API
request.open('GET', 'https://frscout.herokuapp.com/api/v1/teams', true);
request.onload = function () {

    //Parse JSON data
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

        //The following are all sorting algorithms that are used later
        function compareNumber(a, b) {
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
        
        //Initial sort to make sure everything is ready at start (not random)
        teams.sort(compareNumber);
        
        
        var i;
        for (i = 0; i < teams.length; ++i) {
            var table = document.createElement('table');
            
            //Stores rows in table
            var row = [];

            //A "card" is a rectangle of information, containing title, notes, issues, and numerical stats.
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const title = document.createElement('h2');
            title.textContent = teams[i].number + ": " + teams[i].name;

            const notes = document.createElement('p');
            notes.textContent = "Notes: " + teams[i].notes;

            const issues = document.createElement('p');
            issues.textContent = "Issues: " + teams[i].issues;
            
            
            //Add info to table of numerical stats (progress bar + title)
            row.push(table.insertRow(0));
            
            consistencyCell = row[0].insertCell(0);
            consistencyCell.innerHTML = 'Consistency: ' + teams[i].consistency;
            
            objectiveScoreCell = row[0].insertCell(1);
            objectiveScoreCell.innerHTML = 'Objective Score: ' + teams[i].objective_score;
            
            row.push(table.insertRow(1));
            
            pconsistencyCell = row[1].insertCell(0);
            const consistency = document.createElement('progress');
            consistency.value = teams[i].consistency;
            consistency.max = 10;
            pconsistencyCell.appendChild(consistency);
            
            pobjectiveScoreCell = row[1].insertCell(1);
            const objectivescore = document.createElement('progress');
            objectivescore.value = teams[i].objective_score;
            objectivescore.max = 10;
            pobjectiveScoreCell.appendChild(objectivescore);
            
            row.push(table.insertRow(2));
            
            driverSkillCell = row[2].insertCell(0);
            driverSkillCell.innerHTML = 'Driver Skill: ' + teams[i].driver_skill;
            
            autonomousCell = row[2].insertCell(1);
            autonomousCell.innerHTML = 'Autonomous: ' + teams[i].autonomous;
            
            row.push(table.insertRow(3));
            
            pdriverSkillCell = row[3].insertCell(0);
            const driverskill = document.createElement('progress');
            driverskill.value = teams[i].driver_skill;
            driverskill.max = 10;
            pdriverSkillCell.appendChild(driverskill);
            
            pautonomousCell = row[3].insertCell(1);
            const autonomous = document.createElement('progress');
            autonomous.value = teams[i].autonomous;
            autonomous.max = 10;
            pautonomousCell.appendChild(autonomous);
    
            //Add everything to the card
            container.appendChild(card);
            card.appendChild(title);
            card.appendChild(notes);
            card.appendChild(issues);
            card.appendChild(table);
            
        }
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `API Not working. DEVON! Gah!`;
        app.appendChild(errorMessage);
    }
}

request.send();