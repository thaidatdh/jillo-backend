let mongoose = require('mongoose');

//schema
let commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    card_id: {
        type: String,
        required: true
    },
    user_id: {
      type: String,
      required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

// Export Comment Model
let Comment = module.exports = mongoose.model('comment', commentSchema);

module.exports.get = function (callback, limit) {
  Comment.find(callback).limit(limit); 
}