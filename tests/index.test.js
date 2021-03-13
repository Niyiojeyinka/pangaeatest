const request = require("supertest");
const { Payload } = require("../models/");
const expect = require("chai").expect;
const pubapp = require("../publisher");
const subapp = require("../subscriber");
const faker = require("faker");

beforeEach(function (done) {
  setTimeout(function () {
    done();
  }, 200);
});

describe("Publisher Server endpoints is working", () => {
  it("Subscriber can subscribe", async () => {
    const topic = faker.random.word();
    const url = "http://localhost:9000/test1";
    const response = await request(pubapp).post(`/subscribe/${topic}`).send({
      url,
    });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.haveOwnProperty("url", url);
    expect(response.body).to.haveOwnProperty("topic", topic);
  });

  it("Can send http requests to all subscribers", async () => {
    const topic = faker.random.word();
    const response = await request(pubapp)
      .post(`/publish/${topic}`)
      .send({
        data: {
          message: faker.random.words,
        },
      });

    const payloads = Payload.findAll({});
    expect(response.status).to.be.equal(200);
    expect(payloads.length).to.be.greaterThan(0);
  });
});