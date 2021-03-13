# PANGAEA TEST

### Note

Wanted use Redis Pub/Sub but discovered using the approach
will eliminate need to create subscribe endpoint as
stipulated in the requirement document since in a pub/sub
system , each party know nothing about each other thus,
there is no need to subscribe because each subscriber only
listen on the channels they want.

I used redis for Queue Job processing of notification so
as too decrease the response time of the publish endpoint
and run the notification function in the background.

used two different table for both pubisher and subscriber
to simulate how live microservices will use different
or separate database. i used tables instead to reduce the
complex for this test project.

### Create Subscription Endpoint

POST http://vps-c1781ca2.vps.ovh.ca:8000/subscribe/{topic}

`"Content-Type: application/json" -d`

```json
{ "url": "http://localhost:9000/test1" }
```

### Publish message to topic

POST http://vps-c1781ca2.vps.ovh.ca:8000/publish/{topic}

```json
{
  "message": "bami pump tire yen"
}
```

### Verify or see data received by subscriber

GET http://vps-c1781ca2.vps.ovh.ca:9000/{topic}

#### Stack

- NodeJS
- ExpressJS
- MYSQL,Sequelize ORM
- Redis ,BEE-QUEUE
- CHAI,MOCHA,SUPERTEST
