module.exports = (sequelize, Sequelize) => {
  const Payload = sequelize.define("Payload", {
    data: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    topic: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  return Payload;
};
