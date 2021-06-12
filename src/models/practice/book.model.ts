import * as mongoose from "mongoose";

interface IBook {
  title: string;
  author: mongoose.Schema.Types.ObjectId;
}

// permitted -> String | Number | Date | Buffer | Boolean | Mixed | ObjectId | Array | Decimal128 | Map
const bookSchema = new mongoose.Schema({
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "authors" },
});

const BookModel = mongoose.model<IBook & mongoose.Document>(
  "books", // use plurals in lowercase
  bookSchema
);

export default BookModel;
