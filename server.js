const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory books array
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Book REST API! Visit /books to see the list of books.");
});

// GET all books
app.get("/books", (req, res) => {
  res.status(200).json({
    count: books.length,
    books: books
  });
});

// POST new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) return res.status(400).json({ message: "Title and author required" });

  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update book
app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  res.json(book);
});

// DELETE book
app.delete("/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const deleted = books.splice(index, 1);
  res.json({ message: "Book deleted", book: deleted[0] });
});

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/books`));
