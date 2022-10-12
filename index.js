const express = require("express");
const bodyParser = require('body-parser');
const axios = require("axios");
const app = express().use(bodyParser.json()); // creates http server
//const token = 'VERIFICATION_TOKEN';
const PORT = process.env.PORT || 3030;

// your code
app.get('/webhook', (req, res) => {
    // check if verification token is correct
    
    let mode=req.query['hub.mode']
    let challenge=req.query['hub.challenge']
    let verify_token=req.query['hub.verify_token']
    let token=req.query['hub.verify_token']
    
    if (mode && token) {
        if (mode === 'subscribed' && verify_token === token) {
            res.status(200).send(challenge);
        } else {
            
            // return challenge
            res.status(401).send(challenge);
        }    
    }
});

app.post('/webhook', (req, res) => {
    
    body_param=req.body;
    // print request body
    console.log(JSON.stringify(req.body,null,2));
    if (body_param.object) {
        if (body_param.entry &&
            body_param.entry[0].challenges &&
            body_param.entry[0].challenges[0].value.message &&
            body_param.entry[0].challenges[0].value.message[0]
            ) {
            let phone_number_id = body_param.entry[0].challenges[0].value.metadata.phone_number_id;
            let from = body_param.entry[0].challenges[0].value.messages[0].from;
            let msg_body = body_param.entry[0].challenges[0].value.messages[0].text.body;

            axios({
                method: 'POST',
                URL: `https://graph.facebook.com/v14.0/${phone_number_id}/messages?access_token=${token}`,
                data: {
                    messaging_product: 'whatsapp',
                    to: from,
                    text: {
                        body: 'hello code'

                    }
                },
                headers:{
                    
                    'Content-Type': 'application/json'
                }
            });
            res.sendStatus(200);
        }else{
            res.sendStatus(404);
        }
    }
    // return a text response
    const data = {
        responses: [
            {
                // type: 'randomText',
                // messages: ['Hi', 'Hello']
            }
        ]
    };

    //res.json(data);
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});