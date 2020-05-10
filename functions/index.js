const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
admin.initializeApp();

exports.subscribe = functions.https.onRequest((req, res) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
 admin.messaging().subscribeToTopic([req.query.token], "push").then(function(x) {res.send("")}).catch(function(error) {res.send(error)});
});

exports.send = functions.https.onRequest((req, res) => {
res.setHeader('Access-Control-Allow-Origin', '*');
var message = {
    "topic" : "push",
    "data": {
      "title": req.query.title || "test",
      "body": req.query.body || "test notification",
      "tag": req.query.tag || "default",
      "notify": req.query.notify=="true"?"true":"false"
  },
    "webpush": {
      "fcm_options": {
        "link": req.query.url || "https://theabbie.github.io"
      }
   }
}
admin.messaging().send(message).then((response) => {
res.end();
}).catch((error) => {
res.end("error")
});
});

exports.post = functions.https.onRequest((req, res) => {
 res.setHeader('Access-Control-Allow-Origin', '*');
    const response = req.query.response;
    axios.post('https://recaptcha.google.com/recaptcha/api/siteverify',{
            secret: functions.config().recaptcha.secret,
            response: response
        }).then(result => {
        res.send(result.data);
    }).catch(reason => {
        res.send("Recaptcha request failed.")
    })
});
