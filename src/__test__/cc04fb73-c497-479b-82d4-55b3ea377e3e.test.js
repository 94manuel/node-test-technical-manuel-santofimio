const request = require('supertest');
const app = require('./../test/app');

describe('GET /books', function () {
  const bookSignature = {
    id: expect.any(String),
    title: expect.any(String),
    author: expect.any(String),
    pages: expect.any(Number),
    status: expect.any(String),
  };

  const filterByStatus = {
    filterBy: 'status',
    term: 'AVAILABLE',
  };

  const BOOKS_FILTERED_TOTAL = 11;
  const BOOKS_TOTAL = 50;
  const HTTP_OK = 200;

  it('should filter books by status', async () => {
    await testFilterBooksByStatus(filterByStatus, BOOKS_FILTERED_TOTAL);
  });

  it('should filter books by status case-insensitively', async () => {
    const queryString = {
      filterBy: 'status',
      term: 'AVaIlABLE',
    };

    await testFilterBooksByStatus(queryString, BOOKS_FILTERED_TOTAL);
  });

  const testFilterBooksByStatus = async (queryParams, booksTotal = BOOKS_TOTAL) => {
    const res = await request(app).get('/books').query(queryParams);

    expect(res.status).toBe(HTTP_OK);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toMatchObject(bookSignature);
    expect(res.body.length).toBe(booksTotal);
    expect(res.body.flatMap((book) => book.status)).toEqual(expect.arrayContaining(['AVAILABLE']));
  };

  it('should get all books if [filterBy] is not specify', async () => {
    const res = await request(app).get('/books');

    expect(res.status).toBe(HTTP_OK);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toMatchObject(bookSignature);
    expect(res.body.length).toBe(BOOKS_TOTAL);
  });
});
