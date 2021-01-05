// Require packages and set the port
const express = require('express');
const port = 3002;
const app = express();


const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);
 
    console.log(`Server listening on port ${server.address().port}`);
});

require('./ases.js')();

app.get('/upcoming_matches', (request, response) => {
    console.log(`URL: ${request.url}`);
    response.send(getUpcomingMatches());
});

