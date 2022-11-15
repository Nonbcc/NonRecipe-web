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
      Ingredient = require("../models/ingredient");

router.get("/", function(req, res){
    Ingredient.find({}, function(err, allIngredients){
        if(err){
            console.log(err);
        } else{
            res.render("ingredient/index.ejs", {ingredients: allIngredients});
        }
    })
})

router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res){
    req.body.ingredient.image = '/upload/' + req.file.filename;
    req.body.ingredient.author = {
        id: req.user._id,
        username: req.user.username
    };
    Ingredient.create(req.body.ingredient, function(err, newlyAdded){
        if(err){
            console.log(err);
        } else {
            res.redirect("/ingredients");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("ingredient/new.ejs");
})

router.get("/:id", function(req, res){
    Ingredient.findById(req.params.id, function(err, foundIngredient){
        if(err){
            console.log(err);
        } else {
            res.render("ingredient/show.ejs", {ingredient: foundIngredient})
        }
    });
});

router.get("/:id/edit", function(req, res){
    Ingredient.findById(req.params.id, function(err, foundIngredient){
        if(err){
            console.log(err);
        } else{
            res.render("ingredient/edit.ejs", {ingredient: foundIngredient});
        }
    });
})

router.put("/:id", upload.single('image'), function(req, res){
    if(req.file){
        req.body.ingredient.image = '/upload/' + req.file.filename;
    }
    Ingredient.findByIdAndUpdate(req.params.id, req.body.ingredient, function(err, updatedIngredient){
        if(err){
            console.log(err);
            res.redirect('/ingredients/');
        } else {
            res.redirect('/ingredients/' + req.params.id);
        }
    })
})

router.delete("/:id", function(req, res){
    Ingredient.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            res.redirect('/ingredients/');
        } else{
            res.redirect('/ingredients/');
        }
    });
});

module.exports = router;