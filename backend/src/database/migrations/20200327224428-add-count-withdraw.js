module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('withdraws', 'count', {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('withdraws', 'count');
  },
};
