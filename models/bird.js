var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var birdSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'Bird name is required.'],
    unique: true,
    uniqueCaseInsensitive: true,
    validate: {
      validator: function(n) {
        return n.length >=2;
      },
      message: '{VALUE} is not valid, bird name must be at least 2 letters'
    }
  },        // Bird species common name
  description: String,  // e.g. "Large brown owl"
  averageEggs: {
    type: Number,
    min: [1, 'Should be at least 1 egg.'],
    max: [50, 'Should not be more than 50 eggs'] },
  endangered: {type: Boolean, default: false}, // is this bird species threated with extinction?
  datesSeen: [
    {
    date:
        {
            type: Date,
            required: [true, 'A date is required to add a new sighting.'],
            validate: {
              validator: function (date) {
                  return date.getTime() <= Date.now();
              },
              message: 'Date must be a valid date, and date must be now or in the past.'
            }
        },
    coordinates:
        {
            latitude: Number,
            longitude: Number
        }

    }
  ],  // Array of dates a bird of this species was seen
  nest: {
    location: String,
    materials: String
  },
  height: {
    type: Number,
    min: [1, 'Should be at least 1 cm'],
    max: [300, 'Should be shorter than 300 cm']
  }

});

var Bird = mongoose.model('Bird', birdSchema);
birdSchema.plugin(uniqueValidator);

module.exports = Bird;
