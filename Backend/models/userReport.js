// models/UserReport.js
import mongoose from 'mongoose';

const userReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to User model
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    searchTime: {
      type: Date,
      default: Date.now, // Automatically sets the current time
    },
  },
  { timestamps: true }
);

const UserReport = mongoose.model('UserReport', userReportSchema);
export default UserReport;
