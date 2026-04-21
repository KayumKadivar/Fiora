const mongoose = require('mongoose');
const User = require('./models/User');
const WorkLog = require('./models/WorkLog');
require('dotenv').config();

const seedAll = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGO_URI is missing in .env');
    
    console.log('Connecting to PRODUCTION Database (Atlas)...');
    await mongoose.connect(uri);
    console.log('✓ Connected successfully.');

    // 1. Seed Admin
    const adminEmail = 'admin@gmail.com';
    let admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      admin = await new User({
        name: 'Super Admin',
        email: adminEmail,
        password: 'admin@123',
        role: 'Admin',
        status: 'Active',
        mobileNumber: '0000000000'
      }).save();
      console.log('✓ Admin user created.');
    } else {
      console.log('ℹ Admin user already exists.');
    }

    // 2. Seed Team Members
    const team = [
      { name: 'Kayum Kadivar', email: 'kayumkadivar786@gmail.com', password: 'kayum@123', role: 'User', mobileNumber: '635312809' },
      { name: 'mohammad', email: 'mohammad@gmail.com', password: 'mohammad@123', role: 'User', mobileNumber: '2356999453' },
      { name: 'zaid', email: 'zaid@gmail.com', password: 'zaid@123', role: 'User', mobileNumber: '1234567891' }
    ];

    for (const u of team) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await new User({ ...u, status: 'Active' }).save();
        console.log(`✓ User ${u.name} created.`);
      } else {
        console.log(`ℹ User ${u.name} already exists.`);
      }
    }

    // 3. Seed Work Logs (20 days history)
    const userNames = team.map(u => u.name);
    const existingLogs = await WorkLog.countDocuments({ userName: { $in: userNames } });
    
    if (existingLogs === 0) {
      console.log('Seeding work logs...');
      const statuses = ['Good', 'Medium', 'Bad'];
      const contactNames = ['Rahul Sharma', 'Sneha Gupta', 'Vikram Singh', 'Anjali Verma', 'Suresh Kumar', 'Meera Reddy', 'Arjun Das', 'Pooja Iyer'];
      const logsToSave = [];

      for (const userName of userNames) {
        for (let i = 0; i < 20; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const logsPerDay = Math.floor(Math.random() * 2) + 1;
          
          for (let j = 0; j < logsPerDay; j++) {
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            logsToSave.push({
              contactName: contactNames[Math.floor(Math.random() * contactNames.length)],
              contactNumber: (Math.floor(Math.random() * 9000000000) + 1000000000).toString(),
              userName: userName,
              status: status,
              remarks: `Automated status report: ${status}`,
              nextFollowUpDate: new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000)),
              createdAt: date
            });
          }
        }
      }
      await WorkLog.insertMany(logsToSave);
      console.log(`✓ Seeded ${logsToSave.length} work logs.`);
    } else {
      console.log('ℹ Work logs already exist.');
    }

    console.log('\n🚀 ALL DATA SUCCESSFULLY SYNCED TO ATLAS!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedAll();
