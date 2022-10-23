const express = require("express");
const router = express.Router();
const homeController = require("./controllers/homeController");
const bookController = require("./controllers/bookController");

router.get("/", homeController.getHome);
router.get("/book-list", bookController.getBookList);
router.get("/books", bookController.getBook);
router.post("/books", bookController.postBook);
router.post("/delete", bookController.deleteBook);
router.get("/book-list/:id/edit", bookController.editBook);
router.post("/book-list/:id", bookController.updateBook);

module.exports = router;
