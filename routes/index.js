var express = require('express');
var router = express.Router();
var firebase = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://kosheros-store.firebaseio.com"
});

var db = firebase.firestore();

router.get('/get', function(req, res, next) {
  if (req.query.url) {
    db.collection('urls')
    .where('url', '==', req.query.url)
    .get()
    .then(result => {
      if (result.empty) {
        console.log("blocked: " + req.query.url)
        res.render('index', { url: req.query.url })
      } else {
        res.redirect(req.query.url)
      }
    })
  } else {
    console.log("No params passed!")
    res.render('index');
  }
});

module.exports = router;
