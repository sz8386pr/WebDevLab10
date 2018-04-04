var express = require('express');
var router = express.Router();
var Bird = require('../models/bird');

/* GET home page. */
router.get('/', function(req, res, next) {
  // Query to fetch all documents, just get the name fields, sort by Name
  Bird.find().select( {name: 1, description: 1} ).sort( {name: 1} )
    .then( (birdDocs) => {
      console.log('All birds', birdDocs);
      res.render('index', {title: 'All Birds', birds: birdDocs})
    }).catch( (err) => {
      next(err);
    });
});


// POST create new bird document
router.post('/addBird', function(req, res, next){

  // Use form data in req.body to create new Bird
  var bird = Bird(req.body);

  // Nest the nest attributes to match the Bird schema
  bird.nest = {
    location: req.body.nestLocation,
    materials: req.body.nestMaterials
  };

  // Save the Bird object to DB as new Bird document
  bird.save().then( (birdDoc) => {
    console.log(birdDoc);
    res.redirect('/');    // create a request to / to load the home page
  }).catch((err) => {

    if (err.name == 'ValidationError') {  // flash message for user
      req.flash('error', err.message);
      res.redirect('/');
    }

    // else if (err.code === 11000) {  // JS template literal
    //   req.flash('error', '${req.body.name} is already in the database');
    //   req.redirect('/');
    // }

    else {
        next(err);  // send errors to the error handlers
    }

  });
});


// GET info about one bird
router.get('/bird/:_id', function(req, res, next){
  // Get the _id of the bird from req.params
  // query DB to get this bird's document
  Bird.findOne( {_id: req.params._id})
    .then( (birdDoc) => {
      if (birdDoc) {    // if a bird with this id is found in DB
        console.log(birdDoc);
        // This method will sort birdDoc by date
        // birdDoc.dateSeen.sort(function(a,b) {return a.getTime() < b.getTime()});

        res.render('birdinfo', { title: birdDoc.name, bird: birdDoc});
      } else {          // else, if bird not found, birdDoc will be undefined
        var err = Error('Bird not found');  // create a new error
        err.status = 404; // set it's status to 404
        throw err;        // causes the chained catch function to run
      }
    }).catch ( (err) => {
      next(err); // 404 and db errors
    });
});


// POST a new sighting for a bird
router.post('/addSighting', function (req, res, next){

  Bird.findOneAndUpdate(
    {_id: req.body._id},
    {$push: {datesSeen:{ $each: [req.body.date], $sort: -1 }}},
    { runValidators: true})

    .then( (updatedBirdDoc) => {
      if (updatedBirdDoc) {
        res.redirect(`/bird/${req.body._id}`);
    } else {
      var err = Error("Adding sighting error, bird not found");
      err.status = 404;
      throw err;
    }
  }).catch( (err) => {
    if (err.name === "CastError") {
      req.flash('error', 'Date must be in a valid format');
      res.redirect(`/bird/${req.body._id}`);
    }
    else if (err.name === "ValidationError") {
      req.flash('error', err.message);
      res.redirect(`/bird/${req.body._id}`);
    }
    else {
      next(err);
    }
  });
});

module.exports = router;
