const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.api = functions.https.onRequest((req, res) => {
 admin.database().ref("main/"+req.query.path).once("value", function(snapshot) {
    res.send(snapshot.val());
 });
});
