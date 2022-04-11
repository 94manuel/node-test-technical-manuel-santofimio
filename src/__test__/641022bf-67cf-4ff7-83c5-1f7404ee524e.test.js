const { top3MostLentBooksQ22021 } = require('./../test/handler');

describe('top3MostLentBooksQ22021', function () {
  it('should exist a function with the given name', function () {
    expect(top3MostLentBooksQ22021).not.toBeNull();
  });

  it('should return the 3 most lent books in Q2 2021', async () => {
    const expected = ['Asami Asami', 'Catch 22', 'Learning OpenCV'];

    const top3Books = await top3MostLentBooksQ22021();

    expect(top3Books).toBeInstanceOf(Array);
    expect(top3Books.length).toBe(3);
    expect(top3Books).toEqual(expected);
    expect(top3Books[0]).toBe('Asami Asami');
    expect(top3Books[1]).toBe('Catch 22');
    expect(top3Books[2]).toBe('Learning OpenCV');
  });
});

const request = require('supertest');
const app = require('./../test/app');

describe('GET /report', function () {
  it('should return 200 status code and the result of the executed function', async () => {
    const res = await request(app).get('/report');

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).not.toBeLessThan(3);
    expect(res.body.length).not.toBeGreaterThan(5);
  });
});
