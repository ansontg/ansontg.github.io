const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

//Match struct
function match(number, blue_alliance_1, blue_alliance_2, blue_alliance_3, red_alliance_1, red_alliance_2, red_alliance_3, red_score, blue_score, red_ranking_points, blue_ranking_points, winning_alliance) {
    this.number = number;
    this.blue_alliance_1 = blue_alliance_1;
    this.blue_alliance_2 = blue_alliance_2;
    this.blue_alliance_3 = blue_alliance_3;
    this.red_alliance_1 = red_alliance_1;
    this.red_alliance_2 = red_alliance_2;
    this.red_alliance_3 = red_alliance_3;
    this.red_score = red_score;
    this.blue_score = blue_score;
    this.red_ranking_points = red_ranking_points;
    this.blue_ranking_points = blue_ranking_points;
}

//Array to store matches from API
var matches = [];


app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://frscout.herokuapp.com/api/v1/matches', true);
request.onload = function () {

    // Begin accessing JSON data here
    var retrieved = JSON.parse(this.response);
    if (request.status = "SUCCESS") {

        var i = 0;
        retrieved.data.forEach(group => {

            matches.push(new match(
                retrieved.data[i].number,
                retrieved.data[i].blue_alliance_1,
                retrieved.data[i].blue_alliance_2,
                retrieved.data[i].blue_alliance_3,
                retrieved.data[i].red_alliance_1,
                retrieved.data[i].red_alliance_2,
                retrieved.data[i].red_alliance_3,
                retrieved.data[i].red_score,
                retrieved.data[i].blue_score,
                retrieved.data[i].red_ranking_points,
                retrieved.data[i].blue_ranking_points,
            ));
            i++;
        });

        //Sorting algorithm
        function compareNumber(a, b) {
            return a.number - b.number;
        }

        //Sorts matches chronologically
        matches.sort(compareNumber);


        var i;
        for (i = 0; i < matches.length; ++i) {
            
            //Holds team numbers
            var table = document.createElement('table');
            table.id = "matchtable";
            
            //Holds rows of table
            var row = [];

            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            const number = document.createElement('h2');
            
            //Changes title depending on who won
            if (matches[i].red_score > matches[i].blue_score){
                number.textContent = 'Game ' + matches[i].number + " - Red Team Victory";
                number.style.color = "red";
            } else if (matches[i].red_score < matches[i].blue_score){
                number.textContent = 'Game ' + matches[i].number + " - Blue Team Victory";
                number.style.color = "royalblue";
            } else {
                number.textContent = 'Game ' + matches[i].number + " - Draw";
                number.style.color = "purple";
            }
            
            //Add row to 0th position of table, etc. etc.
            row.push(table.insertRow(0));
            
            redscorecell = row[0].insertCell(0);
            const redscore = document.createElement('h2');
            redscore.style.color = "red";
            redscore.textContent = matches[i].red_score + "pts + " + matches[i].red_ranking_points + "RP";
            
            bluescorecell = row[0].insertCell(1);
            const bluescore = document.createElement('h2');
            bluescore.style.color = "royalblue";
            bluescore.textContent = matches[i].blue_score + "pts + " + matches[i].blue_ranking_points + "RP";
            
            row.push(table.insertRow(1));
            
            redteam1cell = row[1].insertCell(0);
            const redteam1 = document.createElement('h3');
            redteam1.style.color = "red";
            redteam1.textContent = "Team " + matches[i].red_alliance_1;
            
            blueteam1cell = row[1].insertCell(1);
            const blueteam1 = document.createElement('h3');
            blueteam1.style.color = "royalblue";
            blueteam1.textContent = "Team " + matches[i].blue_alliance_1;
            
            row.push(table.insertRow(2));
            
            redteam2cell = row[2].insertCell(0);
            const redteam2 = document.createElement('h3');
            redteam2.style.color = "red";
            redteam2.textContent = "Team " + matches[i].red_alliance_2;
            
            blueteam2cell = row[2].insertCell(1);
            const blueteam2 = document.createElement('h3');
            blueteam2.style.color = "royalblue";
            blueteam2.textContent = "Team " + matches[i].blue_alliance_2;
            
            row.push(table.insertRow(3));
            
            redteam3cell = row[3].insertCell(0);
            const redteam3 = document.createElement('h3');
            redteam3.style.color = "red";
            redteam3.textContent = "Team " + matches[i].red_alliance_3;
            
            blueteam3cell = row[3].insertCell(1);
            const blueteam3 = document.createElement('h3');
            blueteam3.style.color = "royalblue";
            blueteam3.textContent = "Team " + matches[i].blue_alliance_3;
    

            //Add everything to the page
            container.appendChild(card);
            card.appendChild(number);

            card.appendChild(table);
            redscorecell.appendChild(redscore);
            bluescorecell.appendChild(bluescore);
            
            redteam1cell.appendChild(redteam1);
            blueteam1cell.appendChild(blueteam1);
            redteam2cell.appendChild(redteam2);
            blueteam2cell.appendChild(blueteam2);
            redteam3cell.appendChild(redteam3);
            blueteam3cell.appendChild(blueteam3);

        }
    } else {
        const errorMessage = document.createElement('marquee');
        errorMessage.textContent = "API Not working. DEVON! Gah!";
        app.appendChild(errorMessage);
    }
}

request.send();
