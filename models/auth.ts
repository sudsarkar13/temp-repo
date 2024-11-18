import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  twoFactorSecret: String,
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  recoveryCodes: [{
    code: String,
    used: Boolean,
  }],
  sessions: [{
    token: String,
    ip: String,
    userAgent: String,
    lastActive: Date,
    expiresAt: Date,
  }],
  loginAttempts: {
    count: { type: Number, default: 0 },
    lastAttempt: Date,
    lockedUntil: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true,
});

// Indexes
adminSchema.index({ email: 1 }, { unique: true });
adminSchema.index({ 'sessions.token': 1 });
adminSchema.index({ 'sessions.expiresAt': 1 });

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Verify password method
adminSchema.methods.checkPassword = async function(password: string) {
  return await bcrypt.compare(password, this.password);
};

adminSchema.methods.verifyPassword = async function(password: string) {
  return bcrypt.compare(password, this.password);
};

// Add any static methods here
adminSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

export default Admin;
