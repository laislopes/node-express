import express from "express"
import db from "./config/dbConnect.js"
import books from "./models/Book.js"
import routes from "./routes/index.js"

db.on("error", console.log.bind(console, 'Connection Error'));
db.once("open", () => {
    console.log('Database connection has been made successfully')
})

const app = express();

app.use(express.json())

routes(app);

app.get('/books/:id', (req, res) =>{
    let index = findBook(req.params.id);
    res.json(books[index]);
})

app.post('/books', (req, res) =>{
    books.push(req.body);
    res.status(201).send('The book has been registered successfully!')
})

app.put('/books/:id', (req, res) =>{
    let index = findBook(req.params.id);
    books[index].title = req.body.title;
    res.json(books);
})

app.delete('/books/:id', (req, res) =>{
    let {id} = req.params;
    let index = findBook(id);
    books.splice(index, 1);
    res.send(`The book ${id} has been deleted successfully!`)
})

function findBook(id){
    return books.findIndex(book => book.id == id);
}

export default app