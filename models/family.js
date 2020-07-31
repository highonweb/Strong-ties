
var mongoose = require('mongoose');

var familySchema = new mongoose.Schema({
  familyid: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  events: {
      type:[{
          type:String
      }]
  },
  familyinc: {
    type:Number
  },
  shoppingList: [{
    name:String,
    avatar:String
  }],
  income: [{
    name:String,
    value:Number
  }],
  expense: [{
    name:String,
    value:Number
  }],
  message:[
    {
      name : String,
  message : String
    }
  ],
  photos: {
    type:[{
        type:Buffer
    }]}
});

var Family = mongoose.model('Family', familySchema);
module.exports = Family;