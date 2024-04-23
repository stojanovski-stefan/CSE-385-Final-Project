const queries = {
  allBooks: `SELECT * FROM project.book_data ORDER BY rating DESC LIMIT 100;`,
  fictionBooks: `SELECT * FROM project.book_data WHERE categories LIKE '%fiction%' && categories NOT LIKE '%nonfiction%';`,
  nonfictionBooks: `SELECT * FROM project.book_data WHERE categories LIKE '%nonfiction%';`,
  biographyBooks: `SELECT * FROM project.book_data WHERE categories LIKE '%biography%' && categories NOT LIKE '%autobiography%';`,
  mysteryBooks: `SELECT * FROM project.book_data WHERE categories LIKE '%mystery%';`,
  fantasyBooks: `SELECT * FROM project.book_data WHERE categories LIKE '%fantasy%';`,
  badQuery: `SELECT * FROM project.this_table_does_not_exist;`,
};

module.exports = queries;
