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

  const BOOKS_TOTAL = 50;
  const HTTP_OK = 200;
  const HTTP_BAD_REQUEST = 400;

  const expectedAscendingSort = [
    162, 170, 171, 175, 178, 179, 196, 197, 198, 202, 203, 206, 211, 213, 215, 216, 217, 222, 229, 230, 233, 235, 236,
    240, 242, 252, 258, 265,
  ];

  const expectedDescendingSort = [
    265, 258, 252, 242, 240, 236, 235, 233, 230, 229, 222, 217, 216, 215, 213, 211, 206, 203, 202, 198, 197, 196, 179,
    178, 175, 171, 170, 162,
  ];

  it('should order the books by pages ascending', async () => {
    const queryParams = {
      orderBy: JSON.stringify({ pages: 'asc' }),
    };

    await testOrderBooks(queryParams, (book) => book.pages, expectedAscendingSort);
  });

  it('should order the books by pages descending', async () => {
    const queryParams = {
      orderBy: JSON.stringify({ pages: 'desc' }),
    };

    await testOrderBooks(queryParams, (book) => book.pages, expectedDescendingSort);
  });

  const testOrderBooks = async (queryParams, flatMapFn, expected) => {
    const res = await request(app).get('/books').query(queryParams);

    expect(res.status).toBe(HTTP_OK);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(BOOKS_TOTAL);
    expect(res.body[0]).toMatchObject(bookSignature);

    const booksPages = [...new Set(res.body.flatMap(flatMapFn))];
    expect(booksPages).toEqual(expected);
  };

  it('should get 400 status code if orderBy parameter is not valid', async () => {
    const queryParams = {
      orderBy: JSON.stringify({ fake: 'desc' }),
    };

    const res = await request(app).get('/books').query(queryParams);

    expect(res.status).toBe(HTTP_BAD_REQUEST);
  });

  it('should get 400 status code if orderBy value is not valid', async () => {
    const queryParams = {
      orderBy: JSON.stringify({ author: '' }),
    };

    const res = await request(app).get('/books').query(queryParams);

    expect(res.status).toBe(HTTP_BAD_REQUEST);
  });
});
