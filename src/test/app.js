const express = require('express');
const {getReport, getBooks} = require("./handler");

// App
const app = express();
const router = express.Router();
router.get('/books', getBooks)
router.get('/report', getReport)

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', [router]);

module.exports = app; 
