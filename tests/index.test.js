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

const topic = faker.random.word();

describe("Publisher Server endpoints is working", () => {
  it("Subscriber can subscribe", async () => {
    // const topic = faker.random.word();
    const url = "http://localhost:9000/test1";
    const response = await request(pubapp).post(`/subscribe/${topic}`).send({
      url,
    });

    expect(response.status).to.be.equal(200);
    expect(response.body).to.haveOwnProperty("url", url);
    expect(response.body).to.haveOwnProperty("topic", topic);
  });

  it("Can send http requests to all subscribers", async () => {
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

describe("Subsciber Server endpoints is working", () => {
  it("Subscriber can receive data and return success status", async () => {
    const response = await request(subapp).post(`/${topic}`).send({
      topic,
      data: {},
    });

    expect(response.status).to.be.equal(200);
  });

  it("Subscriber returns invalid request", async () => {
    const response = await request(subapp).post(`/${topic}`).send({});
    expect(response.status).to.be.equal(400);
  });
});
