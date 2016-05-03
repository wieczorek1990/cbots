import bodyParser from 'body-parser';
import express from 'express';
import request from 'request';

import config from './config.json';
import createMessage from './bot';

const FACEBOOK_MESSAGES_ROUTE = 'https://graph.facebook.com/v2.6/me/messages?access_token=' + config.page_access_token;

function handleMessage(mid, sender, text) {
    console.log(`Message ${mid} received.`);
    request({
        url: FACEBOOK_MESSAGES_ROUTE,
        method: 'POST',
        json: {
            'recipient': {
                'id': sender
            },
            'message': createMessage(text)
        }
    }, function(error, response, body) {
        if (error || response.statusCode !== 200) {
            console.log(body);
        } else {
          console.log(`Response for ${mid} sent.`);
        }
    });
}

let app = express();
app.use(bodyParser.json());

app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === config.verify_token) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Error, wrong validation token.');
    }
});

app.post('/webhook', function(req, res) {
    let messaging_events = req.body.entry[0].messaging;
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i];
        let mid = event.message.mid;
        let sender = event.sender.id;
        if (event.message && event.message.text) {
            let text = event.message.text;
            handleMessage(mid, sender, text);
        }
    }
    res.sendStatus(200);
});

app.listen(config.port, function() {
    console.log(`Listening on port ${config.port}.`);
});

