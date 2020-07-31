var express = require('express');
var app = express();
var webpush = require("web-push")
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
const fetch = require('node-fetch');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cors = require('cors')
var User = require('./models/user');
var Family = require('./models/family');
app.set('view engine', 'ejs');
var mongoDB='mongodb+srv://dbuser:dbkey@myclouddb-arw5e.mongodb.net/fam?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  
});
io.on('connection', () =>{
  
})
app.use(cors())
//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// serve static files from template
app.use(express.static('public'));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

app.get('/messages', (req, res) => {
  
  
  Family.findOne({familyid:req.session.familyId}).exec((err, fam)=> {
    
    
    if(fam != null){
      res.json(fam.message);
    }
    else{
      res.send(null);
    }
  })
})
app.post('/api/additem',async (req,res)=>{
  
  
  Family.findOne({familyid:req.session.familyId}).exec((err,fam)=>{
    
      var data = {
        name:req.body.name,
        avatar:req.body.avatar,
      }
      
      
    fam.shoppingList.push(data)
    fam.save((err,res)=>{
      io.emit('list', data);
    
    })
  })
})
app.post('/messages', (req, res) => {
  
  
  Family.findOne({familyid:req.session.familyId}).exec((err, fam)=> {
    
    if(err){
      
    }
    
    fetch(`https://www.purgomalum.com/service/json?text=${req.body.message}`)
    .then(res => res.json())
    .then(
      (data)=>{
        var msg={
          name: req.body.name,
          message: data.result
        }
        
        fam.message.push(msg)
    fam.save((err) =>{
      if(err){
        sendStatus(500);}
      io.emit('message', msg);
      res.sendStatus(200);
      User.find({familyid : req.session.familyId}).exec((err,users)=>{
        for (let index = 0; index < users.length; index++) {
          const element = users[index];
          const subs = element.subscription
          subs.forEach(subu => {
           if(subu != undefined){
             console.log(subs);
             const payload = JSON.stringify({title: `New Message`,body: `${msg.message}` });
             webpush.sendNotification(JSON.parse(subu.sub), payload);
             
             }
          });
          
          
          
          
        }
      })
    })
      }
    )
    
  })
})
/*
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});
*/
// error handler
// define as the last app.use callback
/*
app.use(function (err, req, res, next) {
  res.render('404')
});
*/

// listen on port 3000
http.listen(process.env.PORT || 3000, function () {
  
});