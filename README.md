#utils-firebase-import-opengov-agenda

Import agenda from 360 OpenGov to Firebase

##Installation

Clone repo from GitHub.

```
$ git clone git@github.com:telemark/utils-firebase-import-opengov-agenda.git
```

cd into directory and install dependecies using npm.

```
$ npm install
```

##Usage

Setup config.js to fit your environment.

**firebaseHost** address to your firebase example: your-firebase-ref.firebaseio.com

**firebaseSecret** your firebase secret, you find it in your Firebase dashboard

**ogmHost** url to your OpenGov host, usually http://opengov.cloudapp.net

**ogmPath** path to your OpenGov installation. example: /Meetings/tfk

**ogmMeetingId** Id for the meeting you want to import agenda from. It is the last part of the url. 'http://opengov.cloudapp.net/Meetings/tfk/Meetings/Details/202762' the id is '202762'