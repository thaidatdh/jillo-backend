let mongoose = require('mongoose');

//schema
let boardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner_id: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });
boardSchema.virtual('columns', {
  ref: 'column',
  localField: '_id',
  foreignField: 'board_id',
  justOne: false
});
// Export Board Model
let Board = module.exports = mongoose.model('board', boardSchema);

module.exports.get = function (callback, limit) {
    Board.find(callback).limit(limit); 
}