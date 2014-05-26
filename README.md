HTML chat
=========
Features
--------
* HTTP REST for creating new chat messages and receive list of existing messages

* Stomp over Websockets used for subscription request to receive notifications about changes.

Installing the application
----------------------------
Assumption is that:
* $LIVEOAK points to directory with your Liveoak server
* $LIVEOAK_EXAMPLES points to directory with Liveoak examples

So then copy the example in the _apps_ directory of your Liveoak server and start the server
```shell
$ cp -r $LIVEOAK_EXAMPLES/chat/chat-html $LIVEOAK/apps
$ sh $LIVEOAK/bin/standalone.sh
````

Running the application
-----------------------

* Open your browser at [http://localhost:8080/chat-html](http://localhost:8080/chat-html). Once you display example, you are automatically subscribed
to receive notifications about created/updated/deleted messages done by other users. So if you open example with 2 web browsers and create new message in first browser window, the second window will be immediately updated as well.
This example supports just creating new messages. For updating or deleting messages, you should use [Liveoak admin console](http://localhost:8080/admin)

See detailed documentation about this example [here](http://liveoak.io/docs/guides/tutorial_chat/#chat-html-application) .

