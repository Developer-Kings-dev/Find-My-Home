// config/firebase.js
const admin = require('firebase-admin');
// const serviceAccount = require('../firebaseadminsdk.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: "gs://accomodation-app-fb0b2.appspot.com"
// });

// const bucket = admin.storage().bucket();
// module.exports = { bucket };

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
  storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
});

const bucket = admin.storage().bucket();
module.exports = bucket;
