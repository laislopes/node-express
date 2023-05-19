import express from "express";
import books from "./booksRoutes.js";

const routes = (app) => {
    app.route('/').get((_,res) => {
        res.status(200).send({title: "Node Course"})
    })

    app.use(
        express.json(),
        books
    )
};


export default routes;