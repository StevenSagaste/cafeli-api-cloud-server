const express = require("express");
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json()); // creates http server
const token = 'VERIFICATION_TOKEN';
const PORT = process.env.PORT || 3030;

// your code
app.get('/webhook', (req, res) => {
    // check if verification token is correct
    
    let mode=req.query['hub.mode']
    let challenge=req.query['hub.challenge']
    let verify_token=req.query['hub.verify_token']
    
    if (req.query.verify_token !== token) {
        return res.sendStatus(401);
    }

    // return challenge
    return res.end(challenge);
});

app.post('/webhook', (req, res) => {
    // check if verification token is correct
    if (req.query.verify_token !== token) {
        return res.sendStatus(401);
    }
    body_param=req.body;
    // print request body
    console.log(JSON.stringify(req.body,null,2));

    // return a text response
    const data = {
        responses: [
            {
                // type: 'randomText',
                // messages: ['Hi', 'Hello']
            }
        ]
    };

    res.json(data);
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});