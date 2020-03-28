module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('deliverymans', 'status', {
      type: Sequelize.BOOLEAN,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: false,
      defaultValue: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('deliverymans', 'status');
  },
};
