const functions = require('firebase-functions');
const admin = require('firebase-admin');
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
res.send("");
}).catch((error) => {
res.end("error");
});
});
});
