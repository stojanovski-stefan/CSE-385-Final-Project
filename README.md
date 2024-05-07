# CSE-385-Final-Project

## Installation

1. Navigate to the kaggle dataset, [Amazon Books Review](https://www.kaggle.com/datasets/mohamedbakhet/amazon-books-reviews), and download the two csv files.

2. Open `books.sql` and `db.properties` and update the the password in both files. In `books.sql`, you will update line 31 where it says 'your_password'

3. Open MySQLWorkbench and run `books.sql` in a locally hosted MySQL database.

4. Import the csv files you downloaded from kaggle using the command line client.

```SQL
-- Opens MySQL command line client
mysql --local_infile=1 -u root -p
```

```SQL
set global local_infile=true;

use bookdata;

-- Make sure to add the correct path to the csv files
load data local infile
'/path/to/books_data.csv' into table
books_data
fields terminated by ','
optionally enclosed by '"'
lines terminated by '\n'
ignore 1 rows;

load data local infile
'/path/to/Books_rating.csv' into table
books_rating
fields terminated by ','
optionally enclosed by '"'
lines terminated by '\n'
ignore 1 rows;

```

5. Using [npm](https://nodejs.org/en), install all the dependencies listed in package.json

```
npm install
```

6. Run DBConnect.js. This files creates a locally hosted server that listens on port 3000.

```
node DBConnect.js
```
