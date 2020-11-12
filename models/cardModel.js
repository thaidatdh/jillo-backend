let mongoose = require('mongoose');

//schema
let cardSchema = mongoose.Schema({
    desc: {
        type: String,
        required: true
    },
    column_id: {
        type: String,
        required: true
    },
    order: {
      type: Number,
      default: 0,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

// Export Card Model
let Card = module.exports = mongoose.model('card', cardSchema);

module.exports.get = function (callback, limit) {
  Card.find(callback).limit(limit); 
}