const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a project title'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a project description'],
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/400x250/1a1a2e/00ff88?text=Project',
    },
    tags: [
        {
            type: String,
            trim: true,
        }
    ],
    demoLink: {
        type: String,
        default: '',
    },
    githubLink: {
        type: String,
        default: '',
    },
    details: {
        type: String,
        default: '',
    },
    featured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Update the updatedAt field before saving
projectSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Project', projectSchema);
