const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.api = functions.https.onRequest((req, res) => {
 admin.messaging().subscribeToTopic([req.query.token], "push").then(function(x) {res.send("")}).catch(function(error) {res.send("error")});
});
