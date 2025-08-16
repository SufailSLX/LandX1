import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Property title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Property description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  category: {
    type: String,
    required: [true, 'Property category is required'],
    enum: ['House', 'Apartment', 'Villa', 'Cottage', 'Penthouse', 'Residence', 'Property', 'Home'],
  },
  price: {
    type: Number,
    required: [true, 'Property price is required'],
    min: [0, 'Price cannot be negative'],
  },
  area: {
    type: Number,
    required: [true, 'Property area is required'],
    min: [1, 'Area must be at least 1 square meter'],
  },
  address: {
    type: String,
    required: [true, 'Property address is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
  coordinates: {
    latitude: {
      type: Number,
      min: [-90, 'Latitude must be between -90 and 90'],
      max: [90, 'Latitude must be between -90 and 90'],
    },
    longitude: {
      type: Number,
      min: [-180, 'Longitude must be between -180 and 180'],
      max: [180, 'Longitude must be between -180 and 180'],
    },
  },
  facilities: {
    bedrooms: {
      type: Number,
      required: [true, 'Number of bedrooms is required'],
      min: [0, 'Bedrooms cannot be negative'],
    },
    bathrooms: {
      type: Number,
      required: [true, 'Number of bathrooms is required'],
      min: [0, 'Bathrooms cannot be negative'],
    },
    parkings: {
      type: Number,
      required: [true, 'Number of parking spaces is required'],
      min: [0, 'Parking spaces cannot be negative'],
    },
  },
  amenities: [{
    type: String,
    trim: true,
  }],
  images: [{
    url: {
      type: String,
      required: true,
    },
    public_id: String,
    alt: String,
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Property owner is required'],
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'rented', 'pending'],
    default: 'available',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be less than 0'],
      max: [5, 'Rating cannot be more than 5'],
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt field before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better search performance
propertySchema.index({ title: 'text', description: 'text', city: 'text', country: 'text' });
propertySchema.index({ price: 1 });
propertySchema.index({ category: 1 });
propertySchema.index({ city: 1 });
propertySchema.index({ featured: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ createdAt: -1 });

export default mongoose.model('Property', propertySchema);