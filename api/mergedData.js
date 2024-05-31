import { getSingleBook, deleteBook } from './bookData';
import { getSingleAuthor, getAuthorBooks, deleteSingleAuthor } from './authorData';

// for merged promises
// TODO: Get data for viewBook
const getBookDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE BOOK
  getSingleBook(firebaseKey).then((bookObject) => { // returns single book object
    // GET AUTHOR
    getSingleAuthor(bookObject.author_id) // we nest this promise so that we can use the book object
    // Create an object that has book data and an object named authorObject
      .then((authorObject) => resolve({ ...bookObject, authorObject }));
  }).catch(reject);
});

const getAuthorDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleAuthor(firebaseKey).then((authorObject) => {
    getAuthorBooks(authorObject.firebaseKey)
      .then((bookArray) => resolve({ ...authorObject, books: bookArray }));
  }).catch(reject);
});

const deleteAuthorBookRel = (firebaseKey) => new Promise((resolve, reject) => {
  getAuthorBooks(firebaseKey).then((authorBooksArray) => {
    const deleteBookPromises = authorBooksArray.map((book) => deleteBook(book.firebaseKey));

    Promise.all(deleteBookPromises).then(() => {
      deleteSingleAuthor(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { getBookDetails, getAuthorDetails, deleteAuthorBookRel };
