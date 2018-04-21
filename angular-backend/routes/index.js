var express = require('express');
var router = express.Router();
var multer = require('multer');

// destination point
var DIR = './uploads';

// uploading a single file the name "photo"
var upload = multer({dest: DIR}).single('audio')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// file upload function

router.post('/', function(req, res, next){
    var path = '';

    upload(req,res, function(err){
      // in case an error occurs during upload
      if(err){
         console.log(err)
         return res.status(422).send("The file can not be uploaded due to error");

      }
      req.file.path;
      return res.send("Success! The file has been uploaded"+path)
    })
});
module.exports = router;
