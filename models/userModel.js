let mongoose = require('mongoose');

//schema
let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    photo_link: {
      type: String,
      required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export User Model
let User = module.exports = mongoose.model('user', userSchema);

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit); 
}