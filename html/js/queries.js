const queries = {
  allBooks: `SELECT  *  FROM bookdata.books_data ORDER BY ratingsCount DESC LIMIT 30;`,
  fictionBooks: `SELECT * FROM bookdata.books_data WHERE categories LIKE '%fiction%' && categories NOT LIKE '%nonfiction%' LIMIT 100;`,
  nonfictionBooks: `SELECT * FROM bookdata.books_data WHERE categories LIKE '%nonfiction%';`,
  biographyBooks: `SELECT * FROM bookdata.books_data WHERE categories LIKE '%biography%' && categories NOT LIKE '%autobiography%';`,
  mysteryBooks: `SELECT * FROM bookdata.books_data WHERE categories LIKE '%mystery%';`,
  fantasyBooks: `SELECT * FROM bookdata.books_data WHERE categories LIKE '%fantasy%';`,
};

module.exports = queries;
