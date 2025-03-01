const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  points: { type: Number, default: 0 },
  profiles: {
    sign_up_selections: {
      commute_type: {
        type: String,
        enum: ['Car', 'Bus', 'Walk', 'Bike'],
        required: true
      },
      commute_distance: {
        type: String,
        enum: ['0-10 km', '10-30 km', '30-50 km', '50+'],
        required: function () {
          return this.commute_type !== null;
        }
      },
      recycle_frequency: {
        type: String,
        enum: ['Never', 'Sometimes', 'Often', 'Always'],
        required: true
      },
      garbage_bags_biweekly: { type: Number, min: 0, required: true }
    },
    goals_completed: { type: Number, default: 0 },
    streaks: { type: Number, default: 0 },
    items_available: { type: [String], default: [] },
    items_purchased: { type: [String], default: [] },
    goals_assigned: { type: [String], default: [] }
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
