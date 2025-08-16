import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Property from '../models/Property.js';
import Booking from '../models/Booking.js';

// Load environment variables
dotenv.config();

// Sample data
const users = [
  {
    name: 'John Admin',
    email: 'admin@landx.com',
    password: 'admin123',
    role: 'admin',
    isVerified: true,
  },
  {
    name: 'Jane Agent',
    email: 'agent@landx.com',
    password: 'agent123',
    role: 'agent',
    isVerified: true,
  },
  {
    name: 'Bob User',
    email: 'user@landx.com',
    password: 'user123',
    role: 'user',
    isVerified: true,
  },
];

const properties = [
  {
    title: 'Luxury Villa with Ocean View',
    description: 'A stunning luxury villa with breathtaking ocean views, perfect for a peaceful getaway.',
    category: 'Villa',
    price: 850,
    area: 500,
    address: 'Ocean Drive 123',
    city: 'Miami',
    country: 'USA',
    facilities: {
      bedrooms: 4,
      bathrooms: 3,
      parkings: 2,
    },
    amenities: ['Swimming Pool', 'Garden', 'Balcony', 'WiFi', 'Air Conditioning'],
    images: [
      {
        url: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
        alt: 'Luxury Villa Exterior',
      },
    ],
    featured: true,
    status: 'available',
  },
  {
    title: 'Modern City Apartment',
    description: 'A modern apartment in the heart of the city with all amenities.',
    category: 'Apartment',
    price: 450,
    area: 120,
    address: 'Downtown Street 456',
    city: 'New York',
    country: 'USA',
    facilities: {
      bedrooms: 2,
      bathrooms: 2,
      parkings: 1,
    },
    amenities: ['WiFi', 'Air Conditioning', 'Elevator', 'Gym'],
    images: [
      {
        url: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
        alt: 'Modern Apartment',
      },
    ],
    featured: true,
    status: 'available',
  },
  {
    title: 'Cozy Country House',
    description: 'A charming country house surrounded by nature, perfect for a quiet retreat.',
    category: 'House',
    price: 320,
    area: 200,
    address: 'Country Road 789',
    city: 'Austin',
    country: 'USA',
    facilities: {
      bedrooms: 3,
      bathrooms: 2,
      parkings: 2,
    },
    amenities: ['Garden', 'Fireplace', 'WiFi', 'Pet Friendly'],
    images: [
      {
        url: 'https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg',
        alt: 'Country House',
      },
    ],
    featured: false,
    status: 'available',
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 MongoDB Connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Property.deleteMany({});
    await Booking.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create properties with owners
    console.log('🏠 Creating properties...');
    const propertiesWithOwners = properties.map((property, index) => ({
      ...property,
      owner: createdUsers[1]._id, // Assign to agent
    }));
    
    const createdProperties = await Property.create(propertiesWithOwners);
    console.log(`✅ Created ${createdProperties.length} properties`);

    // Create sample bookings
    console.log('📅 Creating bookings...');
    const bookings = [
      {
        property: createdProperties[0]._id,
        user: createdUsers[2]._id,
        checkIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        checkOut: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        guests: 2,
        totalPrice: 5950, // 7 days * 850
        contactInfo: {
          phone: '+1234567890',
          email: 'user@landx.com',
        },
        status: 'confirmed',
        paymentStatus: 'paid',
      },
    ];

    const createdBookings = await Booking.create(bookings);
    console.log(`✅ Created ${createdBookings.length} bookings`);

    console.log('🎉 Database seeded successfully!');
    console.log('\n📋 Test Accounts:');
    console.log('Admin: admin@landx.com / admin123');
    console.log('Agent: agent@landx.com / agent123');
    console.log('User: user@landx.com / user123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();