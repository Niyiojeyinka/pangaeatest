const Queue = require("bee-queue");
require("dotenv").config();
const { request } = require("../helper/request");
const options = {
  removeOnSuccess: true,
  redis: {
    host: process.env.DB_REDIS_HOST,
    port: process.env.DB_REDIS_PORT,
    password: process.env.DB_REDIS_PASS,
  },
};
const notifyQueue = new Queue("notify", options);

notifyQueue.process((job, done) => {
  console.log(`job processing here`, new Date().getTime());
  // Notify
  job.data.subscriptions.forEach(async (subscription) => {
    const res = await request(
      subscription.url,
      "POST",
      "json",
      job.data.payload
    );
  });

  return done();
});

exports.notify = async (subscriptions) => {
  await notifyQueue.createJob(subscriptions).save();
};
