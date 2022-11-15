const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    menu_name: String,
    image: String,
    description: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
});

module.exports = mongoose.model('Menu', menuSchema);