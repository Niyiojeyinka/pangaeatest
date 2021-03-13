const { Subscription } = require("../models/");
const { notify } = require("../jobs/notify");
exports.subscribe = async (req, res) => {
  try {
    const subscription = {
      url: req.body.url,
      topic: req.params.topic,
    };

    await Subscription.create(subscription);

    return res.status(200).json(subscription);
  } catch (e) {
    return res.status(400).json({
      status: "Error",
      message: e.toString(),
    });
  }
};

exports.publish = async (req, res) => {
  try {
    const subscriptions = await Subscription.findAll({
      where: {
        topic: req.params.topic,
      },
    });
    notify({
      subscriptions,
      payload: { topic: req.params.topic, data: req.body },
    });

    return res.status(200).json(subscriptions);
  } catch (e) {
    return res.status(400).json({
      status: "Error",
      message: e.toString(),
    });
  }
};
