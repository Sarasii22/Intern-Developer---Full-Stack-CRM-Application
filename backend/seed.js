const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');     // ← This was missing
const User = require('./models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB Atlas');

    // Delete old users
    await User.deleteMany({});

    // Hash password
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create new user
    await User.create({
      email: 'admin@example.com',
      password: hashedPassword
    });

    console.log('🎉 Test user created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });