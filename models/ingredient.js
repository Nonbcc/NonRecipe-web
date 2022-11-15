const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
    ingredient_name: String,
    image: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);