// Require packages and set the port
const express = require('express');
const port = 3002;
const app = express();
const bodyParser = require('body-parser');
require('./ases.js')();


// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));


app.get('/ases_api/upcoming_matches', (request, response) => {
    getUpcomingMatches().then(
    result => {
      // первая функция-обработчик - запустится при вызове resolve
  console.log("SUCCESS")
      console.log(result);
      response.json({"result": result});
    },
    error => {
      // вторая функция - запустится при вызове reject
      console.log("ERROR")
      console.log(error)
      response.json({"ERROR": error});
    }
  );
    
});

app.get('/ases_api/live_matches', (request, response) => {
    getLiveMatches().then(
    result => {
      // первая функция-обработчик - запустится при вызове resolve
  console.log("SUCCESS")
      console.log(request);
      response.json({"result": result});
    },
    error => {
      // вторая функция - запустится при вызове reject
      console.log("ERROR")
      console.log(error)
      response.json({"ERROR": error});
    }
  );
});

app.get('/ases_api/teams_raiting', (request, response) => {
    getTeamsRaiting().then(
    result => {
      // первая функция-обработчик - запустится при вызове resolve
  console.log("SUCCESS")
      console.log(request);
      response.json({"result": result});
    },
    error => {
      // вторая функция - запустится при вызове reject
      console.log("ERROR")
      console.log(error)
      response.json({"ERROR": error});
    }
  );
});

app.post('/ases_api/analitik', (request, response) => {
    console.log(request.body)
  getMatchAnalitic().then(
  result => {
    // первая функция-обработчик - запустится при вызове resolve
console.log("SUCCESS")
    console.log(request);
    response.json({"result": result});
  },
  error => {
    // вторая функция - запустится при вызове reject
    console.log("ERROR")
    response.json({"ERROR": error, "request.body": request.body});
  }
);
});


app.get('/ases_api', (request, response) => {
      response.json("HOME");
});

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});
