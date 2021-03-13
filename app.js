// Require packages and set the port
const express = require('express');
const port = 3002;
const app = express();
const bodyParser = require('body-parser');
require('./ases.js')();

const Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true })
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

app.get('/ases_api/live_matches', async (request, response) => {
   const url = "https://www.hltv.org/matches";
    nightmare
  .goto(url,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
         'User-Agent':	'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:86.0) Gecko/20100101 Firefox/86.0'
        }},)
  .wait('body')
  .evaluate(() => document.querySelector('body').innerHTML)
  .then(respon => {
     getLiveMatches(respon).then(
    result => {
    
   response.json({"result": result});
    },
    error => {
      // вторая функция - запустится при вызове reject
 
      response.json({"ERROR": error});
    }
  );
 
  }).catch(err => {
    console.log(err);
  });
  console.log();

});

app.get('/ases_api/teams_raiting', (request, response) => {
    getTeamsRaiting().then(
    result => {
      // первая функция-обработчик - запустится при вызове resolve

      response.json({"result": result});
    },
    error => {
      // вторая функция - запустится при вызове reject

      response.json({"ERROR": error});
    }
  );
});

app.get('/ases_api/analitik', (request, response) => {
    console.log(request.body)
  getMatchAnalitic(' https://www.hltv.org/matches/2346705/pact-vs-sprout-esea-premier-season-36-europe').then(
  result => {
    // первая функция-обработчик - запустится при вызове resolve
console.log("SUCCESS")

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
