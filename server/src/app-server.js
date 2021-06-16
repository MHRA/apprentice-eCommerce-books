const express = require('express')
const cors = require('cors')
const mysql = require('mysql')
const  { DB, connection } = require('./db')

const app = express()


const SELECT_ALL_BOOKS_BROWSE = 'SELECT ecommerce.book_details.details_id, ecommerce.book_details.`name`, ecommerce.book_details.price, ecommerce.book_details.total_rating, ecommerce.book_appearance.image FROM ecommerce.book_details RIGHT JOIN ecommerce.book_appearance ON ecommerce.book_details.appearance_id = ecommerce.book_appearance.appearance_id;'

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
    connection.query(SELECT_ALL_BOOKS_BROWSE, (err, results) => {
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
        SELECT_CATEGORISED_BOOKS = SELECT_ALL_BOOKS_BROWSE
    }else{
        SELECT_CATEGORISED_BOOKS = ("SELECT ecommerce.book_details.details_id, ecommerce.book_details.`name`, ecommerce.book_details.price, ecommerce.book_details.total_rating, ecommerce.book_appearance.image, ecommerce.book_categories.category FROM ecommerce.book_details RIGHT JOIN ecommerce.book_appearance ON ecommerce.book_details.appearance_id = ecommerce.book_appearance.appearance_id RIGHT JOIN ecommerce.book_categories ON ecommerce.book_details.details_id = ecommerce.book_categories.book_id WHERE ecommerce.book_categories.category LIKE '" + chosenCategory + "'")
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



app.get('/book-details/:id', (req, res) => {
    let searchTerm = req.params.id;
   
    const SELECT_SEARCHED_BOOKS = (`SELECT ecommerce.book_details.details_id, ecommerce.book_details.name, ecommerce.book_details.publisher, ecommerce.book_details.isbn_10, ecommerce.book_details.isbn_13, ecommerce.book_details.price, ecommerce.book_details.total_rating, ecommerce.book_appearance.image, ecommerce.book_feedback.reviews
    FROM ecommerce.book_details
    RIGHT JOIN ecommerce.book_appearance
    ON ecommerce.book_details.appearance_id = ecommerce.book_appearance.appearance_id
    RIGHT JOIN ecommerce.book_feedback
    ON ecommerce.book_details.details_id = ecommerce.book_feedback.details_id
    WHERE ecommerce.book_details.details_id LIKE '${searchTerm}'`)

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
    let input = req.body.search;
    connection.query("SELECT ecommerce.book_details.details_id, ecommerce.book_details.`name`, ecommerce.book_details.price, ecommerce.book_details.total_rating, ecommerce.book_appearance.image, ecommerce.book_categories.category FROM ecommerce.book_details RIGHT JOIN ecommerce.book_appearance ON ecommerce.book_details.appearance_id = ecommerce.book_appearance.appearance_id RIGHT JOIN ecommerce.book_categories ON ecommerce.book_details.details_id = ecommerce.book_categories.book_id WHERE ecommerce.book_details.name LIKE ?;", "%" + input + "%", (err, results) => {
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