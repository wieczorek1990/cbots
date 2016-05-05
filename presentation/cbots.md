class: center, middle

# Conversational Bots
### for Facebook Messenger

---

# Agenda

1. Introduction
2. Facebook Messenger Platform
3. Cat Bot
4. wit.ai
5. api.ai
6. Microsoft Bot Framework
7. Other solutions
8. What can I possibly write with this?
9. Summary

---

# Introduction

Old times:
* [Cleverbot](http://www.cleverbot.com/)
* [List of Chat Bots](http://ai.wikia.com/wiki/List_Of_Chat_Bots)

New times:
* [2016 will be the year of conversational commerce @ medium.com](https://medium.com/chris-messina/2016-will-be-the-year-of-conversational-commerce-1586e85e3991)
* [Microsoft's Tay is an Example of Bad Design @ medium.com](https://medium.com/@carolinesinders/microsoft-s-tay-is-an-example-of-bad-design-d4e65bb2569f)

---

# [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform)

* Facebook Page (Send message) & Application (Messenger, Webhooks)

* `express` — Hooks for Messenger API

  `GET /webhook` — challene-response authentication

  `POST /webhook` — new message hook
    * read the message
    * send the message to the bot API
    * return the formatted bot API response to sender

* `request` — Post request to Messenger API

```
{
  "recipient": "...",
  "message": {...}
}
```

---

# Cat Bot

Functionality:

* Conversation on Facebook Messenger
* Uses [thecatapi](http://thecatapi.com/)
  * `/api/images/get`
  * `/api/images/get?category=$category`
  * `/api/categories/list`
* Chat functionality:
  * Show random cat image
  * Reply with "meow" text
  * List cat image categories as text
  * Show cat image from requested category
* Server functionality:
  * Cat images sent counter

---

# [wit.ai](https://wit.ai/)

Why?
* Mentioned on Facebook developer pages
* Free even for commercial use
* Many languages supported
* Binding for popular programming languages (JavaScript, Python, Ruby)

How?
* Inbox — new expressions to analyse
* Stories — requests with responses, context, entities, actions, variables
* Actions — custom (conditional) actions (developer implementation) and responses
* Understanding — entities values and search strategies
* Logs — message, context, actions

---

background-image: url(images/wit-inbox.png)
class: center

---

# Entities

* Trait — derived from whole sentence
  * Intent
  * Sentiment
  * Politeness
* Free Text — not predefined message substring
  *	Message Body
  * Contact Name
* Keywords — value from predefined list
  * Country
  * Burger
  * Room

---

background-image: url(images/wit-inbox.png)
class: center

# Inbox

---

background-image: url(images/wit-stories-1.png)
class: center

# Stories (1)

---

background-image: url(images/wit-stories-2.png)
class: center

# Stories (2)

---

background-image: url(images/wit-stories-3.png)
class: center

# Stories (3)

---

background-image: url(images/wit-actions.png)
class: center

# Actions

---

background-image: url(images/wit-understanding.png)
class: center

# Understanding

---


background-image: url(images/wit-logs.png)
class: center

# Logs

---

# Server custom code (1)

```

var CAT_COUNTER = 0;

const actions = {
  ...
  merge(sessionId, context, entities, message, cb) {
    var isImage = false;
    if (firstEntityValue(entities, "isImage") == 'true') {
      isImage = true;
    }
    context.isImage = isImage;
    cb(context);
  },
  counter(sessionId, context, cb) {
    CAT_COUNTER += 1;
    console.log(CAT_COUNTER + ' cats served');
    cb();
  }
}
```

---

# Server custom code (2)

```js
const fbMessage = (recipientId, msg, cb) => {
  var message;
  if (!msg.isImage) {
    message = {
      text: msg.text
    };
  } else {
    message = {
      attachment: {
        type: 'image',
        payload: {
          url: msg.text
        }
      }
    };
  }
  ...
}
```

---

# [api.ai](https://api.ai/)

What?
* Commercial solution
* Free with limited queries, public agents, limited features
* 13 langauges

How?
* Agents — applications
* Entities — concepts specific to a domain
* Intents — mapping between user input and software actions
* Actions — triggered by intents
* Contexts — converstaion state

---

background-image: url(images/api-intents-1.png)
class: center

# Intents (1)

---

background-image: url(images/api-intents-2.png)
class: center

# Intents (2)

---

background-image: url(images/api-intents-3.png)
class: center

# Intents (3)

---

background-image: url(images/api-intents-4.png)
class: center

# Intents (4)

---

background-image: url(images/api-intents-5.png)
class: center

# Intents (5)

---

background-image: url(images/api-entities.png)
class: center

# Entities

---

background-image: url(images/api-logs.png)
class: center

# Logs

---

background-image: url(images/api-domains.png)
class: center

# Domains

---

# Custom server code (1)

```
let CAT_COUNTER = 0;
const actions = {
  counter() {
    CAT_COUNTER += 1;
    console.log(CAT_COUNTER + ' cats served');
  }
}
```

```
function processEvent(event) {
  ...
        let action = response.result.action;

        if (action in actions) {
          actions[action]();
        }
  ...
}
```

---

# Custom server code (2)

```
let isImage = response.result.parameters.isImage === 'true';
if (!isImage) {
  // facebook API limit for text length is 320,
  // so we split message if needed
  var splittedText = splitResponse(responseText);

  for (var i = 0; i < splittedText.length; i++) {
    sendFBMessage(sender, {
      text: splittedText[i]
    });
  }
} else {
  let message = {
    attachment: {
      type: 'image',
      payload: {
        url: responseText
      }
    }
  };
  sendFBMessage(sender, message);
}
```

---

# [Microsoft Bot Framework](https://dev.botframework.com/)

---

# What can I possibly write with this?

* Cat bot? :-)
* Booking bot (tickets, pizza delivery, reservation, etc.)
* Company information bot ("What would you like to know about Apptension?")
* Joke bot
* Comfort bot
* Help desk bot
* Weather bot
* Monitoring bot

---

# Summary

* Different from "free" bots
* Similar & immature solutions
* "Story" driven

---

# Other solutions

* [Pandorabots](http://www.pandorabots.com/)
* [Pingup](http://pingup.com/developers/)
* [OneBotAPI](http://www.onebotapi.com/)

---

class: center, middle

# Thanks

### Questions please
