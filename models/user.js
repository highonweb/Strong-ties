var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  firstlogin:{
    type: Boolean,
    default: true
  },
  avatar:{
    type: String
  },
  name:{
    type:String
  },
  dob:{
    type:String
  },
  pob:{
    type:String
  },
  moninc:{
    type:Number
  },
  contr:{
    type:Number
  },
  familyid: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique:true,
    required: true,
    match: /\S+@\S+\.\S+/,
  },
  password: {
    type: String,
    required: true,
  },
  subscription: [{
    sub:String
  }],
  
});
//authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ email: username })
    .exec(function (err, user) {
      
      if (err) {
        return callback(err)
        
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (password === user.password) {          
          return callback(null, user);
        } else {
          
          bcrypt.hash(password,10,async function (err,hash){
           
          })
          
          
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
  var user = this;
  user.avatar = `https://api.adorable.io/avatars/285/${user.email}.png`
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    next();
  })
});


var User = mongoose.model('User', UserSchema);
module.exports = User;

