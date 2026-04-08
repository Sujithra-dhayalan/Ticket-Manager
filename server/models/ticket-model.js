const mongoose = require("mongoose");

// Ticket Schema
const ticketSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      minlength: [3, 'Subject must be at least 3 characters long'],
      maxlength: [255, 'Subject cannot exceed 255 characters'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      minlength: [10, 'Message must be at least 10 characters long'],
      maxlength: [5000, 'Message cannot exceed 5000 characters'],
      trim: true,
    },
    priority: {
      type: String,
      required: [true, 'Priority is required'],
      enum: {
        values: ['Low', 'Medium', 'High'],
        message: '{VALUE} is not a valid priority. Choose from: Low, Medium, High',
      },
      default: 'Medium',
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['NEW', 'INVESTIGATING', 'RESOLVED'],
        message: '{VALUE} is not a valid status. Choose from: NEW, INVESTIGATING, RESOLVED',
      },
      default: 'NEW',
      index: true,
    },
    assignedTo: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true,
  }
);

ticketSchema.index({ status: 1 });
ticketSchema.index({ priority: 1 });

module.exports = mongoose.model('Ticket', ticketSchema);