var express = require('express');
var bodyParser = require('body-parser');
var notify = require('./lib/notify');
var _ = require('underscore');

var requiredFields = [
    'title',
    'url',
    'public_identifier',
    'sent_at',
    'type'
];

// Validate config
if (_.isUndefined(process.env.HIPCHAT_KEY)) {
    throw "HipChat key required";
} else if (_.isUndefined(process.env.HIPCHAT_ROOM)) {
    throw "HipChat room required";
}

// Setup express
var app = express();

app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));
app.post('/', function (request, response) {
    // Validate request
    if (_.intersection(requiredFields, _.keys(request.body)).length !== requiredFields.length) {
        console.error('Invalid request received.');
        response.status(400).end();
    } else {
        response.status(204).end();

        if (_.has(notify, request.body.type)) {
            notify[request.body.type](request.body);
        } else {
            console.error('Unsupported type: ' + request.body.type);
        }
    }
});

app.listen(app.get('port'), function () {
    console.log("Node app is running at localhost:" + app.get('port'));
});