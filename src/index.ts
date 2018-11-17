import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as algoliasearch from 'algoliasearch'

var client = algoliasearch('LGMCRQQ9DM', 'd84e921aa7b341fd41f2d9f9e7865fbc');
var index = client.initIndex('contacts');

//replace with your firebase admin service json file
var serviceAccount = require('./codedady.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://codedady-management.firebaseio.com"
});



export const helloWorld = functions.https.onRequest((req, res) => {
    var email = req.query.email || "Unknown"
    var username = req.query.username || "Unknown"
    var password = req.query.password || "Unknown"

    admin.auth().createUser({
        email: email,
        emailVerified: false,
        password: password,
        displayName: username,
        photoURL: 'http://www.integraconference.info/wp-content/uploads/2018/03/placeholder-face-big.png',
      })
        .then(function(userRecord) {
           console.log("Successfully created new user:", userRecord);
           addUser(res,userRecord)
        })
        .catch(function(error) {
          console.log("Error creating new user:", error);
          res.json(error)
        });
});


function addUser (res,user) {
    res.json(user)
      var objects = [{
        objectID:user.uid,
        email: user.email,
        photourl:user.photoURL,
       }];
    index.addObjects(objects, function(err, content) {
    console.log(content);
  });
}
