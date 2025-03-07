module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define('Board', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Mes Tâches'
    }
  });

  Board.associate = (models) => {
    Board.belongsTo(models.User, { as: 'owner', foreignKey: 'ownerId' });
    Board.belongsToMany(models.User, {
      through: 'BoardUsers',
      as: 'collaborators',
      foreignKey: 'boardId'
    });
  };

  return Board;
};
