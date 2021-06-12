import * as express from "express";
import * as mongoose from "mongoose";
import AuthorModel from "../../models/practice/author.model";
import BookModel from "../../models/practice/book.model";

class LibraryController {
  private author = AuthorModel;
  private book = BookModel;

  public path = "/practice";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(`${this.path}/library`, this.fetchLibraryBooks);
    this.router.get(`${this.path}/authors`, this.fetchAuthors);
    this.router.post(`${this.path}/library/books`, this.createBook);
  }

  // * fetch all library books
  public fetchLibraryBooks = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const fetchedLibBooks = await this.book
        .find()
        .populate("author", "_id name age");
      // populate({ path: 'author', name: { $eq: 'Ian Fleming' } }).
      response.send(fetchedLibBooks);
    } catch (error) {
      console.log(error);
    }
  };

  // * fetch all authors
  public fetchAuthors = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const fetchedAuthors = await this.author
        .find()
        .populate("books", "_id title");
      response.send(fetchedAuthors);
    } catch (error) {
      console.log(error);
    }
  };

  // * create a library book
  public createBook = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const author = await new AuthorModel({
        _id: new mongoose.Types.ObjectId(),
        name: "Ian Fleming",
        age: 56,
      }).save();

      const book = await new BookModel({
        title: "Live and Let Die",
        author: author._id, // assign the _id from author
      }).save();
      console.log(book);

      author.books.push(book._id);
      const modifiedAuthorEntry = await author.save();
      console.log(modifiedAuthorEntry);

      response.send(book);
    } catch (error) {
      console.log(error);
    }
  };
}

export default LibraryController;
