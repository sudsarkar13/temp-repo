const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = "mongodb+srv://sudsarkar13:BI5hJVmfb7U6P0nE@cluster-portfolio-0.xs1e9.mongodb.net/portfolio";

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
  }
}, {
  timestamps: true,
});

async function createAdmin() {
  try {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority',
      dbName: 'portfolio',
    };

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, opts);
    console.log('Connected to MongoDB');

    const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

    // Check if admin exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log('Admin already exists');
      await mongoose.connection.close();
      return;
    }

    // Create admin
    const hashedPassword = await bcrypt.hash('Admin@123', 12);
    const admin = await Admin.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      twoFactorEnabled: false,
    });

    console.log('Admin created successfully:', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    });

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Failed to create admin:', error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
  }
}

createAdmin();
