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

        function compare(a, b) {
            return a.number - b.number;
        }
        teams.sort(compare);

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

            container.appendChild(card);
            card.appendChild(title);
            card.appendChild(notes);
            card.appendChild(issues);
        }
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = `Gah, it's not working!`;
        app.appendChild(errorMessage);
    }
}

request.send();
