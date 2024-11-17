import mongoose from 'mongoose';

export interface IMessage extends mongoose.Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  readAt?: Date;
  repliedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
}

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
  status: {
    type: String,
    enum: ['unread', 'read', 'replied', 'archived'],
    default: 'unread',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  readAt: Date,
  repliedAt: Date,
  ipAddress: String,
  userAgent: String,
}, {
  timestamps: true,
});

// Add indexes for common queries
messageSchema.index({ status: 1, createdAt: -1 });
messageSchema.index({ priority: 1, status: 1 });
messageSchema.index({ email: 1 });

export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', messageSchema);

export default Message;