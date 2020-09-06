var express = require('express');
var router = express.Router();
var webpush = require('web-push')
var path = require('path')
var User = require('../models/user');
var Family = require('../models/family');
const Calendar = require('calendar-base').Calendar;
var fs = require('fs');
const multer = require('multer');
const publicVapidKey = 'BIJFjOvC8wohJdhk8jDR1bdxrzScskN7ulc5liCldQoCFibQ5Z7lijGikDfdw5eEXfYTUdcuuCczfMQrrvpS77Q';
const privateVapidKey = 'VYgLScLUQAW3fHS1YBCA-szoDyaBZtg38WS2wcssuKg';

webpush.setVapidDetails('mailto:ms2k1@gmail.com', publicVapidKey, privateVapidKey);
// GET route for reading data
router.get('/Funtime', async (req,res)=>{
  Family.findOne({familyid:req.session.familyId}).exec((err,family)=>{
   
    User.findById(req.session.userId).exec((err,user)=>{
      User.find({familyid:req.session.familyId }).exec((err,users)=>{
        if(req.session.userId == null){
          return res.send('Please login')
        }
        return res.render('Funtime',{family:family,user:user,users:users})
      
      })
    })
  })
})

router.post('/gallery', (req,res)=>{
var dob =req.body.date
User.findById(req.session.userId).exec((err,user)=>{
  user.name=req.body.name
  user.dob=dob
  user.age=req.body.age
  user.pob=req.body.pob
  user.moninc=req.body.moninc
  user.contr=(Number(req.body.contr)/100)*user.moninc
  user.save()
  
})
return res.redirect('gallery')
})
router.post('/subscribe', async (req, res) => {
   const subscriptionn = JSON.stringify(req.body);
   var subdata = {
     sub:subscriptionn,     //////////////////////////////////////////////////////////////////////////////////////////////
   }
   User.findById(req.session.userId).exec((err,user)=>{
    user.subscription.push(subdata)
    user.save()
   })
   res.sendStatus(200);
      const payload = JSON.stringify({ title: `Hello!`, body: 'world' });
     webpush.sendNotification(JSON.parse(subscriptionn), payload);
   
 }
  
 );


router.get('/', (req, res, next) => {
  return res.render('home');
});
router.get('/signup', (req, res, next) => {
  
  return res.render('signup');
});
router.post('/', async (req,res,next) => {
  let userdata ={
    familyid: req.body.familyid,
    email: req.body.email,
    password: req.body.password
  }
 User.create(userdata,(err,user)=>{console.log(err,user)})
  Family.exists({familyid: req.body.familyid},(err,res)=>{
    console.log(res);
    if(err){
      res.send(err)
    }
    else{
      if(!res){
        
       Family.create({familyid: req.body.familyid})
      }
    }

  })
   
    
  
  
  return res.redirect('/')
})

router.post('/home', async (req,res,next) => {
  User.authenticate(req.body.email, req.body.password, function (error, user) {
    if (error || !user) {
      console.log(error);
      return res.send('Wrong username or password.');
    } else {
      req.session.userId = user._id;
      req.session.familyId = user.familyid
      req.session.age= user.age
      if (user.firstlogin) {
        user.firstlogin=false;
        user.save();
        return res.redirect('/profile');
      }
      if (!user.firstlogin) {
        
        return res.redirect('/gallery');
        
      }
      
    }
  });
} )
router.get('/logout', function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

router.get('/login', async (req,res)=>{

  return res.render('index')
})

router.get('/list', async (req,res)=>{
  Family.findOne({familyid:req.session.familyId}).exec((err,family)=>{
    User.findById(req.session.userId).exec((err,user)=>{
      User.find({familyid:req.session.familyId }).exec((err,users)=>{
        if(req.session.userId == null){
          return res.send('Please login')
        }
        return res.render('list',{family:family,user:user,users:users})
      })

    })
    
  })
  
})

router.get('/gallery', async (req,res)=>{
  Family.findOne({familyid:req.session.familyId}).exec((err,family)=>{
    User.findById(req.session.userId).exec((err,user)=>{
      User.find({familyid:req.session.familyId }).exec((err,users)=>{
        if(req.session.userId == null){
          return res.render('error')
        }
        return res.render('gallery',{family:family,user:user,users:users})
      })
      
    })
    
  })
  
})
router.get('/calendar', async (req,res)=>{
  Family.findOne({familyid:req.session.familyId}).exec((err,family)=>{
    User.findById(req.session.userId).exec((err,user)=>{
      User.find({familyid:req.session.familyId }).exec((err,users)=>{
        if(req.session.userId == null){
          return res.send('Please login')
        }
        return res.render('calendar',{family:family,user:user,users:users})
      })

    })
    
  })
  
})
router.get('/chat', async (req,res)=>{
  Family.findOne({familyid:req.session.familyId}).exec((err,family)=>{
    User.findById(req.session.userId).exec((err,user)=>{
      User.find({familyid:req.session.familyId }).exec((err,users)=>{
        if(req.session.userId == null){
          return res.send('Please login')
        }
        return res.render('chat',{family:family,user:user,users:users})
      })
    })
  })
  
})
router.get('/profile', async (req,res)=>{
  User.findById(req.session.userId).exec((err,user)=>{
    return res.render('profile',{user:user})
  })
  
})
router.get('/budget', async (req,res)=>{

  Family.findOne({familyid:req.session.familyId}).exec((err,family)=>{
    User.findById(req.session.userId).exec((err,user)=>{
      User.find({familyid:req.session.familyId}).exec((err,users)=>{
console.log(req.session);
      if(req.session.age <= 18){
        return res.render('crazy')
      }
      else{
        return res.render('budget',{family:family,user:user,users:users})
      }
      })
      
    })
    
  })
  
})



router.post('/api/addinc',async (req,res)=>{
  Family.findOne({familyid:req.session.familyId}).exec((err,fam)=>{
      var data = {
        name:req.body.iname,
        value:req.body.ivalue,
      }
      
    fam.income.push(data)
    fam.save()
    })
  })

  router.post('/api/addexp',async (req,res)=>{
    Family.findOne({familyid:req.session.familyId}).exec((err,fam)=>{
        var data = {
          name:req.body.ename,
          value:req.body.evalue,
        }
        
      fam.expense.push(data)
      fam.save()
      })
    })

router.post('/newevent', async (req,res) => {
  let event = JSON.stringify(req.body)
 Family.findOneAndUpdate({familyid: req.session.familyId},{$push:{events:event}},(error,fam)=>{
   User.find({familyid : req.session.familyId}).exec((err,users)=>{
     for (let index = 0; index < users.length; index++) {
       const element = users[index];
       const subs = element.subscription
       subs.forEach(subu => {
        if(subu != undefined){
          console.log(subs);
          const payload = JSON.stringify({ title: `${req.body.event}`, body: `${req.body.date}` });
          webpush.sendNotification(JSON.parse(subu.sub), payload);
          
          }
       });
       
       
       
       
     }
   })
   if (error) {
     console.error(error);
     
   } else {
     
   }
 })
 return res.redirect('/calendar')
})
router.post('/newpic', multer({ dest: 'uploads/' }).array('img', 12) ,async (req,res)=>{ 

  var img,encode_image,image;
  for (let index = 0; index < req.files.length; index++) {
    Family.findOne({familyid:req.session.familyId}).exec(
      (err,family)=>{
        var ext = path.extname(req.files[index].originalname);
        
              img = fs.readFileSync(req.files[index].path);
              encode_image = img.toString('base64');
              image =  Buffer.from(encode_image, 'base64')
                  family.photos.push(image)
                  family.save()
                  }
    )
  }

 
    return res.redirect('/gallery')
  

  
})
router.get('/api/cal/:month/:year',async (req,res)=>{
  const cal = new Calendar();
  const dates = cal.getCalendar(req.params.year,req.params.month)
  res.setHeader('Content-Type', 'application/json');
  return res.json(dates)
  
})
router.get('/api/nfamid',async (req,res)=>{
  var id = (Math.random() + 1).toString(36).substring(7)
  Family.find({},(err,fams)=>{
      for (let index = 0; index < fams.length; index++) {
      const element = fams[index];
      if(id==element.id){
        res.setHeader('Content-Type', 'application/json');
        return res.json('none')
      }
    }
  })
  res.setHeader('Content-Type', 'application/json');
  return res.json(id)
  
})
router.get('/api/cal/eve',async (req,res)=>{
  Family.findOne({familyid:req.session.familyId}).exec((err,fam)=>{

    
    console.log(fam);
    arr=[];
    for (let index = 0; index < fam.events.length; index++) {
      console.log(fam.events[index]);
      arr.push(JSON.parse(fam.events[index]))

    }
    if(arr==[]){
      arr.push({event:'nulls'})
    }
    res.setHeader('Content-Type', 'application/json');
  return res.json(arr)
  })
  
  
})
router.get('/api/nm',async (req,res)=>{
  Family.findOne({familyid:req.session.familyId}).exec((err,fam)=>{
    console.log(fam);
    fam.income=undefined;
    fam.expense=undefined;
    fam.save()
    
    
  })
  
  
})

router.post('/api/removeitem',async (req,res)=>{
  
  
  Family.findOneAndUpdate({familyid:req.session.familyId},{$pull:{shoppingList: {name:req.body.name}}}).exec((err,fam)=>{
     
        
    
    
 
    })
  })
  router.get('/api/bud/',async (req,res)=>{
    Family.findOne({familyid:req.session.familyId}).exec((err,fam)=>{
      console.log(req.session);
      
      arr=[];
      for (let index = 0; index < fam.events.length; index++) {
        arr.push(JSON.parse(fam.events[index]))
      }
      if(arr==[]){
        arr.push({event:'nulls'})
      }
      res.setHeader('Content-Type', 'application/json');
    return res.json(arr)
    })
    
    
  })
  
  
module.exports = router;

