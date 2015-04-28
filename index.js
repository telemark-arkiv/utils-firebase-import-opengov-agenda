'use strict';

var ogm = require('opengov-meetings');
var uuid = require('uuid');
var config = require('./config');
var Firebase = require('firebase');
var FirebaseTokenGenerator = require('firebase-token-generator');
var tokenGenerator = new FirebaseTokenGenerator(config.firebaseSecret);
var token = tokenGenerator.createToken({"dill": "dall"}, {"admin" : true});
var dataRef = new Firebase("https://" + config.firebaseHost + "/" + config.ogmMeetingId + "/saker/");
var opts = {
  host: config.ogmHost,
  path: config.ogmPath,
  meetingId: config.ogmMeetingId
  };

function prepareAgendaItem(item) {
  var newUUID = uuid.v4();
  var newItem = {
    active : false,
    antall_forslag : 0,
    behandlet : false,
    sakID : item.id + '-' +  newUUID,
    saksinnstilling : "",
    saksnummer : item.agendanumber,
    sakstall : parseInt(item.agendanumber.split('/')[0], 10),
    sakstittel :  item.title,
    ts : new Date().getTime(),
    votering : false
  };

  return newItem;
}

function putNewAgendaItem (item) {
  var putData = prepareAgendaItem(item);

  dataRef.child(putData.sakID).set(putData, function(error) {
    if (error) {
      console.error(error);
    } else {
      console.log(putData.saksnummer + ' OK');
    }
  });
}

function dataHandler(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('Data received from OpenGov.');
    data.agenda.forEach(function(item, index, arr) {
      putNewAgendaItem(item);
      if (index === arr.length - 1) {
        console.log('Finished parsing data. ' + arr.length + ' items ready for import.');
      }
    });
  }
}

dataRef.authWithCustomToken(token, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.log('Authenticated with Firebase.');
    ogm.getAgenda(opts, dataHandler);
  }
});