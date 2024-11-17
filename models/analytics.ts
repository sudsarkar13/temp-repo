import mongoose from 'mongoose';

export interface IAnalytics extends mongoose.Document {
  type: 'pageView' | 'projectView' | 'messageSubmitted';
  projectId?: string;
  messageId?: string;
  path?: string;
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
  referrer?: string;
}

const analyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['pageView', 'projectView', 'messageSubmitted'],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  },
  path: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
  userAgent: String,
  ipAddress: String,
  referrer: String,
});

// Add indexes for common queries
analyticsSchema.index({ type: 1, timestamp: -1 });
analyticsSchema.index({ projectId: 1, timestamp: -1 });
analyticsSchema.index({ messageId: 1, timestamp: -1 });

export const Analytics = mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', analyticsSchema);

export default Analytics;
