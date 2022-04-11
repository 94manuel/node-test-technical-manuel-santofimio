const axios = require("axios");

//Endpoint para carcar los libros desde la api

const Books = "https://hiring.condorlabs.io/api/books";
const logs = "https://hiring.condorlabs.io/api/books/logs";


const getBooks = async (req,res) =>{
    let status = 200;
    let books = [];
    books = (await axios.get(Books)).data;//Traemos el listado de los libros de la api.

    let orderBy = req.query.orderBy//Guardamos las condiciones para ordenar de forma asc desc

    //Filtramos los libros 
    if (req.query.filterBy) {
        books = await filters(books, req.query);
    }
    //Ordenar por asc y desc.
    if (orderBy) {
        orderBy = JSON.parse(orderBy);
        if (!orderBy.pages) {
            status = 400;
            books = [];
        }else if (orderBy.pages !== 'asc' && orderBy.pages !== 'desc') {
            status = 400;
            books = [];
        }else if (orderBy.pages === 'asc') {
            books = books.sort((a, b) => (a.pages > b.pages) ? 1 : -1);
        } else {
            books = books.sort((a, b) => (a.pages > b.pages) ? -1 : 1);
        }
    }

    res.status(status).json(books);
}

const top3MostLentBooksQ22021 = async () => {
    let consultaLog = (await axios.get(logs)).data;//Traemos el listado de los libros de la api.
    let initialValue = 0;
    //filtrar libros por rango de fechas
    consultaLog = consultaLog.filter(res => Date.parse(res.dateOfLent) >= Date.parse("2021-04-01T00:00:00.000Z") && Date.parse(res.dateOfLent) <= Date.parse("2021-06-30T23:59:59.999Z"));
    
    //Contar libros
    const filtrarMasPrestados = (data,logs) =>  data.reduce((previousValue, currentValue) => (currentValue.title === logs.title ? previousValue + 1 : previousValue),initialValue);//Esta funcion debe ir primero y despues debe ser invocada para evitar error al buscar la funcion.
    
    consultaLog = consultaLog.map(res => {
        return  {...res,occurrences: filtrarMasPrestados(consultaLog,res)}
    });
    //Ordena los libros
    consultaLog = consultaLog.sort((a, b) => (a.occurrences > b.occurrences) ? -1 : 1);

    const seen = new Set();// se crea un objeto para guardar informacion no duplicada
    consultaLog = consultaLog.filter(el => {
        const duplicate = seen.has(el.title);// borramos el duplicado
        seen.add(el.title);//Agrega el nuevo campo sin ser duplicado
        return !duplicate;
    }).slice(0, 3);

    return consultaLog.map(log => log.title);
}

const getReport = async (req, res) => {
    res.status(200).json(await top3MostLentBooksQ22021());
};

const filters = async (data, query) => {
    switch (query.filterBy) {
        case 'pages':
            const from = query.from;
            const to = query.to;
            return await data.filter(book => book.pages >= parseInt(from) && book.pages <= parseInt(to));
        case 'status':
            const term = query.term;
            return await data.filter(book => book.status.toUpperCase() === term.toUpperCase());    
        default:
            break;
    }
    if (query.filterBy === 'pages') {
        const from = query.from;
        const to = query.to;
        return await data.filter(book => book.pages >= parseInt(from) && book.pages <= parseInt(to));
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