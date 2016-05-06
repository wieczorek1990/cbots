var restify = require('restify');
var builder = require('botbuilder');

var config = require('./config.json');

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ appId: config.appId, appSecret: config.appSecret });
bot.add('/', function (session) {
    session.send('Hello World!');
});

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 8445, function () {
    console.log('%s listening to %s', server.name, server.url);
});

