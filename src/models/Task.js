module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('a faire', 'en cours', 'terminé'),
      defaultValue: 'a faire'
    }
  });
  Task.associate = (models) => {
    Task.belongsTo(models.Board, { foreignKey: 'boardId', as: 'board' });
    Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return Task;
};
