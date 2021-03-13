module.exports = (sequelize, Sequelize) => {
  const Subscription = sequelize.define("Subscription", {
    url: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    topic: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Subscription;
};
