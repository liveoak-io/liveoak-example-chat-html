HTML chat
=========
Features
--------
* HTTP REST for creating new chat messages and receive list of existing messages

* Stomp over Websockets used for subscription request to receive notifications about changes.

Installing the application
----------------------------

There are two ways that this example may be installed.

### Admin Console:

1. Click "Install Example Application" button, or "Try example applications" link from "Applications" page if you already have applications installed.
2. Click the "HTML Chat" example and then click "Install".

### Manually:

Assumption is that:
* $LIVEOAK points to the directory with your LiveOak server
* $LIVEOAK_EXAMPLES points to the directory with LiveOak examples

Copy the example into the _apps_ directory of your LiveOak server and start the server
```shell
$ cp -r $LIVEOAK_EXAMPLES/chat/chat-html $LIVEOAK/apps
$ sh $LIVEOAK/bin/standalone.sh
````

Running the application
-----------------------

* Open your browser at [http://localhost:8080/chat-html](http://localhost:8080/chat-html). Once you access the example in your browser, you are automatically subscribed
to receive notifications about created/updated/deleted messages triggered by the actions of other users. So if you open the example with 2 web browsers and create a new message in the first browser window, the second window will be immediately updated with the message.
This example supports just creating new messages. For updating or deleting messages, you should use the [LiveOak Admin Console](http://localhost:8080/admin)

See detailed documentation about this example [here](http://liveoak.io/docs/guides/tutorial_chat/#chat-html-application) .
