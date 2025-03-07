module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Task, { foreignKey: 'userId', as: 'tasks' });
    User.belongsToMany(models.Board, {
      through: 'BoardUsers',
      as: 'collaborations',
      foreignKey: 'userId'
    });
  };

  User.beforeCreate(async (user, options) => {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  return User;
};
