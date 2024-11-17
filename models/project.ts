import mongoose from 'mongoose';

const projectVersionSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  stack: [{ name: String }],
  image: String,
  live: String,
  github: String,
  modifiedBy: String,
  modifiedAt: { type: Date, default: Date.now },
  changes: String,
});

const projectSchema = new mongoose.Schema({
  num: {
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
  category: {
    type: String,
    required: true,
  },
  stack: [{
    name: {
      type: String,
      required: true,
    }
  }],
  image: {
    type: String,
    required: true,
  },
  live: String,
  github: String,
  state: {
    type: String,
    enum: ['draft', 'in_review', 'published', 'archived'],
    default: 'draft',
  },
  publishedAt: Date,
  scheduledPublish: Date,
  versions: [projectVersionSchema],
  analytics: {
    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    lastViewed: Date,
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  },
  mediaGallery: [{
    url: String,
    type: String,
    alt: String,
    order: Number,
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt timestamp on save
projectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Create a new version when project is updated
projectSchema.pre('save', function(next) {
  if (this.isModified('title') || this.isModified('description') || 
      this.isModified('category') || this.isModified('stack') || 
      this.isModified('image') || this.isModified('live') || 
      this.isModified('github')) {
    
    const version = {
      title: this.title,
      description: this.description,
      category: this.category,
      stack: this.stack,
      image: this.image,
      live: this.live,
      github: this.github,
      modifiedAt: new Date(),
      changes: 'Project updated', // This should be passed from the UI
    };

    this.versions.push(version);
  }
  next();
});

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
