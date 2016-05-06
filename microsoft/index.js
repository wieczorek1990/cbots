var restify = require('restify');
var builder = require('botbuilder');

var config = require('./config.json');
var strings = require('./strings.json');

var DEBUG = config.debug;
var bot;

function composeMessage(text, session) {
  return new builder.Message().setText(session, text).addAttachment({
    contentType: 'image/*',
    contentUrl: text
  });
}

if (DEBUG) {
  bot = new builder.TextBot();
} else {
  bot = new builder.BotConnectorBot({
    appId: config.appId,
    appSecret: config.appSecret
  });
}

var dialog = new builder.LuisDialog(config.luis);
dialog.on('Meow', builder.DialogAction.send(strings.Meow));
dialog.on('Categories', builder.DialogAction.send(strings.Categories));
dialog.on('Cat', function(session, args) {
  session.send(composeMessage(strings.Cat, session));
});
dialog.on('Category', function(session, args) {
  var entity = builder.EntityRecognizer.findEntity(args.entities, 'category')
  if (entity) {
    var category = entity['entity'];
    var text = strings.Category + category;
    var message = composeMessage(text, session);
    session.send(message);
  } else {
    session.send('Could not find such category.');
  }
});

bot.add('/', dialog);

if (DEBUG) {
  bot.listenStdin();
} else {
  var server = restify.createServer();
  server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
  server.listen(process.env.port || 8445, function() {
    console.log('%s listening to %s', server.name, server.url);
  });
}
