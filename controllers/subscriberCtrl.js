const { Payload } = require("../models/");

exports.handle = async (req, res) => {
  try {
    const payloads = await Payload.findAll({
      where: {
        topic: req.params.topic,
      },
    });

    return res.status(200).json(payloads);
  } catch (e) {
    return res.status(400).json({
      status: "Error",
      message: e.toString(),
    });
  }
};

exports.receiveNotification = async (req, res) => {
  try {
    const { topic, data } = req.body;
    await Payload.create({
      topic,
      data: JSON.stringify(data),
    });

    return res.status(200).json({
      status: "success",
    });
  } catch (e) {
    return res.status(400).json({
      status: "Error",
      message: e.toString(),
    });
  }
};
