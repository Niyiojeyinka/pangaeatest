module.exports = (sequelize, Sequelize) => {
  const Payload = sequelize.define("Payload", {
    data: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    topic: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Payload;
};
