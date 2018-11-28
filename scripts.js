const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

//app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://frscout.herokuapp.com/api/v1/teams', true);
request.onload = function () {

  // Begin accessing JSON data here
  var retrieved = JSON.parse(this.response);
  if (request.status = "SUCCESS") {
      var i = 0;
      console.log(retrieved.data[1].id);
    retrieved.data.forEach(team => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const title = document.createElement('h2');
      title.textContent = retrieved.data[i].number + ": " + retrieved.data[i].name;

      const notes = document.createElement('p');
      notes.textContent = "Notes: " + retrieved.data[i].notes;
        
      const issues = document.createElement('p');
      issues.textContent = "Issues: " + retrieved.data[i].issues;
    
      

      container.appendChild(card);
      card.appendChild(title);
      card.appendChild(notes);
      card.appendChild(issues);
      i++;
    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();