const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://sudsarkar13:BI5hJVmfb7U6P0nE@cluster-portfolio-0.xs1e9.mongodb.net/portfolio";

async function testConnection() {
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

    // Add event listeners
    mongoose.connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, opts);
    console.log('Connection initialized');

    // Create a simple test schema
    const TestSchema = new mongoose.Schema({
      name: String,
      date: { type: Date, default: Date.now }
    });

    // Try to create a model and perform a simple operation
    const Test = mongoose.models.Test || mongoose.model('Test', TestSchema);
    const testDoc = await Test.create({ name: 'test' });
    console.log('Test document created:', testDoc);

    // Clean up
    await Test.deleteOne({ _id: testDoc._id });
    console.log('Test document cleaned up');

    await mongoose.connection.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testConnection();
