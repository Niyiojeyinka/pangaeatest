module.exports = (sequelize, Sequelize) => {
  const Subscription = sequelize.define("Subscription", {
    url: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    topic: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  return Subscription;
};
