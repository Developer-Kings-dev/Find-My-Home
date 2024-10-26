// config/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../firebaseadminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://accomodation-app-fb0b2.appspot.com"
});

const bucket = admin.storage().bucket();
module.exports = { bucket };
