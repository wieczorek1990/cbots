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

* Facebook Page (Send message) & Application (Messenger, Webhooks).

* `express`:

  Hooks for Messenger API.

  `GET /webhook` — challene-response authentication

  `POST /webhook` — new message hook

* `request`:

  Post request to Messenger API.

  ```json
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

```js

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
  const opts = {
    form: {
      recipient: {
        id: recipientId
      },
      message: message
    }
  };
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

# [Microsoft Bot Framework](https://dev.botframework.com/)

---

# Other solutions

* [Pandorabots](http://www.pandorabots.com/)
* [Pingup](http://pingup.com/developers/)
* [OneBotAPI](http://www.onebotapi.com/)

---

class: center, middle

# Thanks

### Questions please
