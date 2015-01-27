var Hipchat = require('hipchat-client');
var _ = require('underscore');

var hipchatClient = new Hipchat(process.env.HIPCHAT_KEY);

var messageDefaults = {
    room_id: process.env.HIPCHAT_ROOM,
    from: process.env.FROM || 'HockeyApp',
    notify: process.env.NOTIFY || 0
};

var responseHandler = function (err) {
    if (err) console.error(err);
};

var sendMessage = function (message, color) {
    hipchatClient.api.rooms.message(_.extend({
        message: message,
        color: color || 'yellow'
    }, messageDefaults), responseHandler);
};

exports.app_version = function (params) {
    var app = params.app_version;
    sendMessage('<b>New Version of ' + app.title + ' Available</b> ' + app.shortversion + ' (' + app.version + ') &mdash; ' +
        '<a href="' + params.url + '">Download & Install</a><br/>' +
        '<em>Release Notes</em><br/>' +
        app.notes
        , 'green');
};

exports.ping = function (params) {
    sendMessage(params.title + '<br/>' + '<a href="' + params.url + '">View on HockeyApp</a>', 'random');
};

exports.crash_reason = function (params) {
    var crash = params.crash_reason;
    sendMessage('<b>' + params.title + '</b> &mdash; ' + '<a href="' + params.url + '">View on HockeyApp</a><br/>' +
        '<em>Reason:</em> <code>' + crash.reason + '</code>'
        , 'red');
};

exports.feedback = function (params) {
    var feedback = params.feedback;
    sendMessage('<b>' + params.title + '</b> &mdash; ' + '<a href="' + params.url + '">View Discussion</a><br/>' +
    '<b>Subject:</b> ' + _.last(feedback.messages).subject);
};