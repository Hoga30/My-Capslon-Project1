// Book routes here
import express from "express"
const bookRoute = express.Router();
import { test, addNewBook, getAllBooks, getBookById, updateBook, deleteBook, findBookByCategory } from "../controllers/books.controller.js";
import { addBookValidation, testValidation } from "../utils/validation.js";

bookRoute.post("/test", testValidation, test);
bookRoute.post("/add", addBookValidation, addNewBook);
bookRoute.get("/list", getAllBooks);
bookRoute.get("/get/:id", getBookById);
bookRoute.get("/getting/:category",findBookByCategory);
bookRoute.put("/update/:id", updateBook);
bookRoute.delete("/delete/:id", deleteBook);

export default bookRoute;
