const express = require("express");
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json()); // creates http server
const token = 'VERIFICATION_TOKEN';;
const PORT = process.env.PORT || 3030;

// your code
app.get('/', (req, res) => {
    // check if verification token is correct
    if (req.query.token !== token) {
        return res.sendStatus(401);
    }

    // return challenge
    return res.end(req.query.challenge);
});

app.post('/msg', (req, res) => {
    // check if verification token is correct
    if (req.query.token !== token) {
        return res.sendStatus(401);
    }

    // print request body
    console.log(req.body);

    // return a text response
    const data = {
        responses: [
            {
                type: 'randomText',
                messages: ['Hi', 'Hello']
            }
        ]
    };

    res.json(data);
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});