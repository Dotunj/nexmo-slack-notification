const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const port = 3000;
const webhookUrl = 'https://hooks.slack.com/services/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';
const slack = require('slack-notify')(webhookUrl)

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.post("/webhooks/inbound-message", (req, res) => {
    const { text } = req.body
    slack.alert({
        text: 'New SMS message',
        fields: {
            'Message' : text
        }
    });
    res.status(200).end();
})

app.listen(port, () => {
    console.log(`Listening on ${port}`);
})