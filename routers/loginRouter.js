const express = require("express");
const db = require("../sample_db/db.json");
const router = express.Router();

let books = [
  { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
  { id: 2, title: "Lord of the Rings", author: "J.R.R. Tolkien" },
];

router.get("/", (req, res) => {
  res.json(books);
});

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).send("Book not found");
  } else {
    res.json(book);
  }
});

router.post("/", (req, res) => {
  const { title, author } = req.body;
  const id = books.length + 1;
  const newBook = { id, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

module.exports = router;
