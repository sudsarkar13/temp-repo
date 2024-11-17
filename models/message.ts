import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema({
  content: String,
  sentAt: { type: Date, default: Date.now },
  sentBy: String,
});

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    enum: ['high', 'normal', 'low'],
    default: 'normal',
  },
  category: {
    type: String,
    enum: ['business', 'project', 'general', 'support'],
    default: 'general',
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'responded', 'archived'],
    default: 'new',
  },
  responses: [responseSchema],
  followUpDate: Date,
  autoResponded: {
    type: Boolean,
    default: false,
  },
  tags: [String],
  archived: {
    type: Boolean,
    default: false,
    archivedAt: Date,
    reason: String,
  },
  analytics: {
    responseTime: Number, // in minutes
    totalResponses: { type: Number, default: 0 },
    lastResponseDate: Date,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update timestamps
messageSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Calculate response time when a new response is added
messageSchema.pre('save', function(next) {
  if (this.isModified('responses')) {
    if (this.responses.length === 1) {
      const responseTime = (this.responses[0].sentAt - this.createdAt) / (1000 * 60); // Convert to minutes
      this.analytics.responseTime = responseTime;
    }
    this.analytics.totalResponses = this.responses.length;
    this.analytics.lastResponseDate = this.responses[this.responses.length - 1].sentAt;
  }
  next();
});

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
