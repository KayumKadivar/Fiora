const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding...');

    const adminExists = await User.findOne({ email: 'admin@gmail.com' });
    if (adminExists) {
      console.log('Admin user already exists.');
      process.exit(0);
    }

    const adminUser = new User({
      role: 'Admin',
      name: 'Super Admin',
      email: 'admin@gmail.com',
      password: 'admin@123', // In a real app, hash this!
      status: 'Active',
      designation: 'System Administrator',
      mobilePrefix: '+91',
      mobileNumber: '1234567890'
    });

    await adminUser.save();
    console.log('Admin user seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
