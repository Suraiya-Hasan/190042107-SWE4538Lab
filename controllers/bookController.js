const books = require("./../models/books");
const bookModel = require("./../models/books");

const getBookList = async (req, res) => {
  let data = [];
  let books = [];
  try {
    data = await bookModel.find();
    //console.log(data);
    data.forEach((book) => {
      books.push({ name: book.name, author: book.author, genre: book.genre });
    });
  } catch (error) {
    console.log(error);
  } finally {
    res.render("bookList", { books: books, data: data });
  }
};

const getBook = (req, res) => {
  res.render("addBooks");
};

const postBook = (req, res) => {
  const data = new bookModel({
    name: req.body.name,
    author: req.body.author,
    genre: req.body.genre,
  });
  data
    .save()
    .then(() => {
      console.log("Data Saved Successfully!");
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      res.redirect("/books");
    });
};

const deleteBook = (req, res) => {
  let error = "";
  const id = req.params.id;

  bookModel
    .deleteOne({ _id: id })
    .then(() => {
      error = "Data Deleted Successfully!";
      console.log(error);
    })
    .catch((error) => {
      error = "Failed to delete";
      console.log(error);
    })
    .finally(() => {
      res.redirect("/book-list");
    });
};

const editBook = (req, res) => {
  const id = req.params.id;

  bookModel.findById(id, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("Result : ", data);
      res.render("editBooks", { id: id, data: data });
    }
  });
};

const updateBook = (req, res) => {
  const id = req.params.id;

  bookModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      author: req.body.author,
      genre: req.body.genre,
    },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Book Updated Successfully!");
        res.redirect("/book-list");
      }
    }
  );
};

module.exports = {
  getBookList,
  getBook,
  postBook,
  deleteBook,
  editBook,
  updateBook,
};