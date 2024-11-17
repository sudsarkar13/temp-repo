import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  num: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stack: [{
    name: {
      type: String,
      required: true
    }
  }],
  image: {
    type: String,
    required: true,
  },
  live: String,
  github: String,
}, {
  timestamps: true
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema); 