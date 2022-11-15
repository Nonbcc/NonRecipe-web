const mongoose = require("mongoose"),
      Print    = require('./models/print'),
      Comment  = require('./models/comment');
      Menu  = require('./models/menu');
      Ingredient  = require('./models/ingredient');

const data = [
         {
             ingredient_name:"Egg",  
             image:"https://image.sistacafe.com/images/uploads/content_image/image/13982/1435637441-Eggs.jpg",
             author: {
                 id: "6284d715cf55a664a831020c",
                 username: "Gas"
             }
         },
         {
            ingredient_name:"Potato", 
            image:"https://image.makewebeasy.net/makeweb/0/aNSsujWTa/FruitandVegs/Picture49.png?v=202012190947",
            author: {
                id: "6284d715cf55a664a831020c",
                username: "Gas"
            }
         },
         {
            ingredient_name:"Lemon", 
            image:"https://s.isanook.com/ca/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2NhLzAvdWQvMjA4LzEwNDI0NzYvMTA0MDIyNTA2LmpwZw==.jpg",
            author: {
                id: "6284d715cf55a664a831020c",
                username: "Gas"
            }
         },
         {
            ingredient_name:"Bread", 
            image:"https://www.theerahealthybakeroom.com/wp-content/uploads/2020/05/Vegan-Wholewheat-Spinach-Bread.jpg",
            author: {
                id: "6284d715cf55a664a831020c",
                username: "Gas"
            }
         },
         {
            ingredient_name:"milk", 
            image:"http://www.welove-cooking.com/main/wp-content/uploads/2018/10/4-4-4.jpg",
            author: {
                id: "6284d715cf55a664a831020c",
                username: "Gas"
            }
         }
     ];
     const data2 = [
        {
            menu_name: "Char Siu Chicken",
            image: "https://www.simplyrecipes.com/thmb/c2WGNBh8MaN3pfE29ju4OPniOyI=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__02__char_siu_chicken_LEAD-VERTICAL-776a95a57fba4821991055fb1cdedaaa.jpg",
            description: "Love char siu pork? Try its easier, faster cousin, char siu chicken. You'll wonder how you ever grilled chicken thighs without this mix of honey, hoisin, garlic, soy sauce, and Chinese five-spice powder.",
            author: {
                id: "6284ac73d5a603be28efae2a",
                username: "Non"
            }
        },
        {
           menu_name:"Pasta and Bean Picnic Salad", 
           image:"https://www.simplyrecipes.com/thmb/wFh5d-pLseJIWUgB6ruwhtNZZgY=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2017__07__2017-07-26-PastaBeanSalad-7-fee5f80722aa4fd8ba1149cc05f9c741.jpg",
           description: "Pasta and Bean Picnic Salad! This is a spin on classic pasta salad with a white beans, fresh summer vegetables, and a light vinaigrette. No mayo.",
            author: {
                id: "6284ac73d5a603be28efae2a",
                username: "Non"
            }
        },
        {
            menu_name:"Buffalo Chicken Lasagna", 
           image:"https://www.simplyrecipes.com/thmb/HtMZOScaH4yMAmnctMOMIca0kCY=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2017__08__2017-09-06-BuffaloChickenLasagna-15-14bc368cb6154470b77e40532cb8fcf0.jpg",
           description: "Buffalo Chicken Lasagna! Two great dishes, together at last. Creamy blue cheese sauce and spicy chicken layered with lasagna noodles. Perfect for game day and potlucks.",
            author: {
                id: "6284ac73d5a603be28efae2a",
                username: "Non"
            }
        },
        {
            menu_name:"Baked Parmesan Chicken Nuggets", 
           image:"https://www.simplyrecipes.com/thmb/ov7oTdrs4q1uhRJm7v6fNxCFTo8=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Parmesan-Chicken-Nuggets-2-LEAD-5-df4b0ae6b08044a194340760a3c5b4b6.jpg",
           description: "Make baked Parmesan chicken nuggets with just a handful of ingredients. Dip boneless chicken in melted butter, dredged in breadcrumbs and Parmesan cheese, and bake until crisp. Pair with your favorite sauce or dip!",
            author: {
                id: "6284ac73d5a603be28efae2a",
                username: "Non"
            }
        },
        {
            menu_name:"Summer Veggie Tacos", 
           image:"https://www.simplyrecipes.com/thmb/HQBWFAO8JCPcuZxPLnXgmkIHMMQ=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Veggie-Tacos-LEAD-3-18763af09863424a87a662923de82b5e.jpg",
           description: "Made with zucchini, tomatoes, green chiles, and cheese, vegetarian tacos are a great way to use up fresh produce for a filling, delicious meal. Grab some corn tortillas and you’re all set!",
            author: {
                id: "6284ac73d5a603be28efae2a",
                username: "Non"
            }
        }
    ];
function seedDB(){
    Menu.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Data removal complete");
            data2.forEach(function(seed){
                Menu.create(seed, function(err, menu){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("New data added!");
                        // ingredient.comments.push(comment);
                        menu.save();
                    }
                });
            });
        }
    });
    Ingredient.remove({}, function(err){
        if(err){
            console.log(err);
        } else{
            console.log("Data removal complete");
            data.forEach(function(seed){
                Ingredient.create(seed, function(err, ingredient){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("New data added!");
                        // ingredient.comments.push(comment);
                        ingredient.save();
                    }
                });
            });
        }
    });
}

module.exports = seedDB;