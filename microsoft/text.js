var builder = require('botbuilder');

var helloBot = new builder.TextBot();
helloBot.add('/', function (session) {
    session.send('Hello World');
});

helloBot.listenStdin();

