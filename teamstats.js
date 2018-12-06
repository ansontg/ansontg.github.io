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

var teams = [];

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
        
        /*function compareUpdatedAt(a, b) {
            return a.updated_at - b.updated_at;
        }*/
        
        teams.sort(compareNumber);

        //function drawCards()
        var i, len;
                    
        for (i = 0, len = teams.length; i < len; ++i) {
            

            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const title = document.createElement('h2');
            title.textContent = teams[i].number + ": " + teams[i].name;

            const notes = document.createElement('p');
            notes.textContent = "Notes: " + teams[i].notes;

            const issues = document.createElement('p');
            issues.textContent = "Issues: " + teams[i].issues;
            
            const table = document.createElement('table');
            
            const tablebody = document.createElement('tbody');
            
            var row = [];
            
            for (var j = 0; j < 2; j++){
                row.push(document.createElement('tr'));
                row[j].setAttribute('horizontal', '');
            }
            
            
            const consistencyCell = row[0].insertCell(0);
            const objectiveScoreCell = row[0].insertCell(1);
            const driverSkillCell = row[1].insertCell(0);
            const autonomousCell = row[1].insertCell(1);
            
            const consistencyTitle = document.createElement('p');
            consistencyTitle.textContent = "Consistency: " + teams[i].consistency;
            
            const consistency = document.createElement('progress');
            consistency.value = teams[i].consistency;
            consistency.max = 10;
            
            consistencyCell.appendChild(consistencyTitle);
            consistencyCell.appendChild(consistency);
            
            const objectiveScoreTitle = document.createElement('p');
            objectiveScoreTitle.textContent = "Objective Score: " + teams[i].objective_score;
            
            const objectiveScore = document.createElement('progress');
            objectiveScore.value = teams[i].objective_score;
            objectiveScore.max = 10;
            
            consistencyCell.appendChild(objectiveScoreTitle);
            consistencyCell.appendChild(objectiveScore);
            
            const driverSkillTitle = document.createElement('p');
            driverSkillTitle.textContent = "Driver Skill: " + teams[i].driver_skill;
            
            const driverSkill = document.createElement('progress');
            driverSkill.value = teams[i].driver_skill;
            driverSkill.max = 10;
            
            consistencyCell.appendChild(driverSkillTitle);
            consistencyCell.appendChild(driverSkill);
            
            const autonomousTitle = document.createElement('p');
            autonomousTitle.textContent = "Autonomous: " + teams[i].autonomous;
            
            const autonomous = document.createElement('progress');
            autonomous.value = teams[i].autonomous;
            autonomous.max = 10;
            
            consistencyCell.appendChild(autonomousTitle);
            consistencyCell.appendChild(autonomous);
            

            container.appendChild(card);
            card.appendChild(title);
            card.appendChild(notes);
            card.appendChild(issues);
            
            tablebody.appendChild(row[0]);
            tablebody.appendChild(row[1]);

            table.appendChild(tablebody);
            card.appendChild(table);
            
        }
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `API Not working. DEVON! Gah!`;
        app.appendChild(errorMessage);
    }
}

request.send();