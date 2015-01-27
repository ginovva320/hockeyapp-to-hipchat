HockeyApp To HipChat [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/ginovva320/hockeyapp-to-hipchat)
====================

hockeyApp-to-hipchat is a webhook receiver that will post messages to your HipChat instance. HockeyApp supports sending the following types of events to webhooks:

* New Release
* New Crash Group
* New Feedback

### Setup

#### Get Your HipChat Parameters

In order to use this integration, you need a HipChat API notification key and the room name or id to post messages to. 
You can obtain an API key by logging into [HipChat](https://www.hipchat.com/admin/api).

#### Deploy to Heroku

Click on the Heroku button above and fill out the form!

#### Create the Webhook

1. Click on your app on the [HockeyApp dashboard](https://rink.hockeyapp.net/manage/dashboard).
2. Click on Manage App > Webhooks.
3. Click on Create Webook.
4. Enter a name and the URL of your Heroku app e.g. `https://YOUR-APP-NAME.herokuapp.com`

You can test the integration by pinging the webhook from HockeyApp. This should post a message to your HipChat room. If it does not, check your Heroku logs for potential errors.