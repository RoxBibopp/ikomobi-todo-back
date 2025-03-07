const { sequelize, User } = require('../models');

const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate([
      { email: 'user1@example.com', password: 'password1' },
      { email: 'user2@example.com', password: 'password2' }
    ], { individualHooks: true });
    process.exit(0);
  } catch (error) {
    process.exit(1);
  }
};

seed();
