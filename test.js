const server = require('./server/index.js');
const supertest = require('supertest');
// const pool = require('./database/PostgreSQL.js');

const superTestRequest = supertest(server);

describe('Unit Tests for all GET Requests', () => {

  test('It should get all QUESTIONS for a specific Product ID', async () => {
    const payload = {product_id: 71701, page: 1, count: 10};
    const res = await superTestRequest.get('/qa/questions')
      .query(payload)
    expect(res.body).toHaveProperty('product_id');
    expect(res.status).toEqual(200);
  });

  test('It should get all ANSWERS for a specific Question ID', async () => {
    const payload = {page: 1, count: 10};
    const res = await superTestRequest.get('/qa/questions/71701/answers')
      .query(payload)
    expect(res.body).toHaveProperty('question');
    expect(res.status).toEqual(200);
  });
});

describe('Unit Tests for all POST Requests', () => {

  test('It should add a QUESTION to the database tables based on Product ID', async () => {
    const payload = {body: "Am I Question?", name: 'Foo', email: "Foo@Bar.Baz", product_id: 71701};
    const res = await superTestRequest.post('/qa/questions')
      .send(payload)
    expect(res.status).toEqual(201);
  });

  test('It should add an ANSWER with IMAGES to the database tables based on Question ID', async () => {
    const payload = {body: "Am I Answer with Images?", name: 'Foo', email: "Foo@Bar.Baz", photos: ['google.com']};
    const res = await superTestRequest.post('/qa/questions/1111/answers')
      .send(payload)
    expect(res.status).toEqual(201);
  });

  test('It should add an ANSWER without IMAGES to the database tables based on Question ID', async () => {
    const payload = {body: "Am I Answer without Image?", name: 'Foo', email: "Foo@Bar.Baz", photos: []};
    const res = await superTestRequest.post('/qa/questions/1111/answers')
      .send(payload)
    expect(res.status).toEqual(201);
  });

})

describe('Unit Tests for all PUT Requests', () => {

  test('It should increase a QUESTION\'s helpfulness by 1', async () => {
    const res = await superTestRequest.put('/qa/questions/2222/helpful');
    expect(res.status).toEqual(204);
  });

  test('It should increase an ANSWER\'s helpfulness by 1', async () => {
    const res = await superTestRequest.put('/qa/answers/3333/helpful');
    expect(res.status).toEqual(204);
  });

  test('It should change QUESTIONS\'s report status to true and stay as true', async () => {
    const res = await superTestRequest.put('/qa/questions/2222/report');
    expect(res.status).toEqual(204);
  });

  test('It should change ANSWER\'s report status to true and stay as true', async () => {
    const res = await superTestRequest.put('/qa/answers/3333/report');
    expect(res.status).toEqual(204);
  });
})