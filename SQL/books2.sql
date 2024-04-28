CREATE SCHEMA IF NOT EXISTS bookdata;
USE bookdata;

CREATE TABLE books_data (
	title VARCHAR (1000),
    description VARCHAR(1000),
    authors VARCHAR(1000),
    image VARCHAR(1000),
    previewLink VARCHAR(1000),
    publisher VARCHAR(1000),
    publishDate VARCHAR(100),
    infoLink VARCHAR(1000),
    categories VARCHAR(1000),
    ratingsCount DECIMAL
);

CREATE TABLE books_rating (
	id INT,
    title VARCHAR(1000),
    price DECIMAL,
    user_id VARCHAR(50),
    profile_name VARCHAR(500),
    review_helpfulness VARCHAR(20),
    review DECIMAL,
    review_time VARCHAR(100),
    review_summary VARCHAR(1000),
    review_text VARCHAR(1000)
);