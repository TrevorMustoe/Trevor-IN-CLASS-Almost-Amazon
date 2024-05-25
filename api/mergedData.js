import { getSingleBook } from './bookData';
import { getSingleAuthor, getAuthorBooks } from './authorData';

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

const getAuthorDetails = async (firebaseKey) => {
  const authorObject = await getSingleAuthor(firebaseKey);
  const authorBooks = await getAuthorBooks(firebaseKey);
  return { ...authorObject, books: authorBooks };
};
export { getBookDetails, getAuthorDetails };
