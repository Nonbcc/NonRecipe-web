const express = require("express"),
      router = express.Router(),
      multer = require("multer"),
      path = require("path"),
      storage = multer.diskStorage({
          destination: function(req, file, callback){
              callback(null, './public/upload/');
          },
          filename: function(req, file, callback){
              callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
          }
      }),
      imageFilter = function(req, file, callback){
          if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)){
              return callback(new Error('Only jpg, jpeg, png and gif.'), false);
          }
          callback(null, true);
      },
      upload = multer({storage: storage, fileFilter: imageFilter});
      middleware = require('../middleware');
      Menu = require("../models/menu");

router.get("/", function(req, res){
    Menu.find({}, function(err, allMenus){
        if(err){
            console.log(err);
        } else{
            res.render("menu/index.ejs", {menus:allMenus});
        }
    })
})

router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res){
    req.body.menu.image = '/upload/' + req.file.filename;
    req.body.menu.author = {
        id: req.user._id,
        username: req.user.username
    };
    Menu.create(req.body.menu, function(err, newlyAdded){
        if(err){
            console.log(err);
        } else {
            res.redirect("/menus");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("menu/new.ejs");
})

router.get("/:id", function(req, res){
    Menu.findById(req.params.id, function(err, foundMenu){
        if(err){
            console.log(err);
        } else {
            res.render("menu/show.ejs", {menu: foundMenu})
        }
    });
});

router.get("/:id/edit", middleware.checkMenuOwner, function(req, res){
    Menu.findById(req.params.id, function(err, foundMenu){
        if(err){
            console.log(err);
        } else{
            res.render("menu/edit.ejs", {menu: foundMenu});
        }
    });
})

router.put("/:id", upload.single('image'), function(req, res){
    if(req.file){
        req.body.menu.image = '/upload/' + req.file.filename;
    }
    Menu.findByIdAndUpdate(req.params.id, req.body.menu, function(err, updatedMenu){
        if(err){
            console.log(err);
            res.redirect('/menus/');
        } else {
            res.redirect('/menus/' + req.params.id);
        }
    })
})

router.delete("/:id", middleware.checkMenuOwner, function(req, res){
    Menu.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/menus/');
        } else{
            res.redirect('/menus/');
        }
    });
});

module.exports = router;