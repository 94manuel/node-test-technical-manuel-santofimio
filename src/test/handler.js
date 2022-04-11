const axios = require("axios");

const apiBooks = "https://hiring.condorlabs.io/api/books";
const apiLogs = "https://hiring.condorlabs.io/api/books/logs";

const getReport = async (req, res) => {
    res.status(200).json(await top3MostLentBooksQ22021());
};

const top3MostLentBooksQ22021 = async () => {
    let logs = (await axios.get(apiLogs)).data;
    // filter by range, from-to
    const from = Date.parse("2021-04-01T00:00:00.000Z")
    const to = Date.parse("2021-06-30T23:59:59.999Z")
    logs = logs.filter(log => Date.parse(log.dateOfLent) >= from && Date.parse(log.dateOfLent) <= to);
    // count occurrences and order by occurrences
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v.title === val.title ? a + 1 : a), 0);
    logs = logs.map(log => {
        return {...log, occurrences: countOccurrences(logs, log)}
    }).sort((a, b) => (a.occurrences > b.occurrences) ? -1 : 1);

    const seen = new Set();
    logs = logs.filter(el => {
        const duplicate = seen.has(el.title);
        seen.add(el.title);
        return !duplicate;
    }).slice(0, 3);

    return logs.map(log => log.title);
};

const getBooks = async (req, res) => {
    let status = 200;
    let books = [];
    books = (await axios.get(apiBooks)).data;

    let orderBy = req.query.orderBy;
    // filters
    if (req.query.filterBy) {
        books = await filters(books, req.query);
    }

    //orders
    if (orderBy) {
        orderBy = JSON.parse(orderBy);
        if (!orderBy.pages) {
            status = 400;
            books = [];
        }
        if (orderBy.pages !== 'asc' && orderBy.pages !== 'desc') {
            status = 400;
            books = [];
        }
        if (orderBy.pages === 'asc') {
            books = books.sort((a, b) => (a.pages > b.pages) ? 1 : -1);
        } else {
            books = books.sort((a, b) => (a.pages > b.pages) ? -1 : 1);
        }
    }

    res.status(status).json(books);
};

const filters = async (data, query) => {
    if (query.filterBy === 'pages') {
        const from = query.from;
        const to = query.to;
        return await data.filter(book => book.pages >= Number(from) && book.pages <= Number(to));
    }

    if (query.filterBy === 'status') {
        const term = query.term;
        return await data.filter(book => book.status.toUpperCase() === term.toUpperCase());
    }
    return data;
}

module.exports = {
    getReport,
    getBooks,
    top3MostLentBooksQ22021
}
