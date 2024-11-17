import mongoose, { Types } from 'mongoose';

export interface IProject extends mongoose.Document {
  _id: Types.ObjectId;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  status: 'draft' | 'published';
}

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [{
    type: String,
  }],
  imageUrl: {
    type: String,
    required: true,
  },
  githubUrl: String,
  liveUrl: String,
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  viewCount: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Add indexes for common queries
projectSchema.index({ status: 1, featured: 1, order: 1 });
projectSchema.index({ technologies: 1 });
projectSchema.index({ viewCount: -1 });

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);

export default Project;