require("dotenv").config();
const express = require("express");
const connectDB = require("./database/connect");

const app = express();

const PORT = process.env.PORT || 5000;

const books_routes = require("./routes/booksRoutes");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, This is a Books API");
});

//setting router
app.use(books_routes);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Database connected at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
