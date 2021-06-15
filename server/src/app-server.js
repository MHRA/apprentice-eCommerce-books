const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const  { DB, connection } = require('./db')

const app = express()


const SELECT_ALL_BOOKS = 'SELECT * FROM ecommerce.book_details'

connection.connect(err => {
    if(err) {
        return err;
    }
})

console.log(connection)

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log("Working")
})

app.get('/books', (req, res) => {
    connection.query('SELECT * FROM ecommerce.book_details', (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.post('/category', (req, res) => {
    let SELECT_CATEGORISED_BOOKS;
    const chosenCategory = (req.body.category);

    if(chosenCategory == "all"){
        SELECT_CATEGORISED_BOOKS = SELECT_ALL_BOOKS
    }else{
        SELECT_CATEGORISED_BOOKS = ("SELECT * FROM ecommerce.book_details WHERE ecommerce.book_details.category LIKE '" + chosenCategory + "'")
    }
    

    connection.query(SELECT_CATEGORISED_BOOKS, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})


app.get('/search/:searchTerm', (req, res) => {
    let searchTerm = req.params.searchTerm;
   
    const SELECT_SEARCHED_BOOKS = ("SELECT * FROM ecommerce.book_details WHERE ecommerce.book_details.name LIKE '%" + searchTerm + "%'")

    connection.query(SELECT_SEARCHED_BOOKS, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.get('/book-details/:id', (req, res) => {
    let searchTerm = req.params.id;
   
    const SELECT_SEARCHED_BOOKS = ("SELECT * FROM ecommerce.book_details WHERE ecommerce.book_details.id LIKE '" + searchTerm + "'")

    connection.query(SELECT_SEARCHED_BOOKS, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
})

app.post("/search", (req, res) => {
    let input = req.body.name;
    connection.query("SELECT * FROM ecommerce.book_details WHERE ecommerce.book_details.name LIKE ?;", "%" + input + "%", (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    })
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));