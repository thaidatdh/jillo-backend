let mongoose = require('mongoose');

//schema
let columnSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    board_id: {
        type: String,
        required: true
    },
    color: {
      type: String,
      default: 'red',
    },
    order: {
      type: Number,
      default: 0,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });
columnSchema.virtual('cards', {
  ref: 'card',
  localField: '_id',
  foreignField: 'column_id',
  justOne: false
});
// Export Column Model
let Column = module.exports = mongoose.model('column', columnSchema);

module.exports.get = function (callback, limit) {
  Column.find(callback).limit(limit); 
}