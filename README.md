# CSE-385-Final-Project

## About

Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet deserunt eum unde similique hic labore blanditiis, vitae laborum nam nisi ipsam? Ipsa sunt mollitia obcaecati dolor! Voluptatem blanditiis nisi fugit?

## Prerequisites

- Locally hosted MySQL database with the data in the attached CSV files.
- Create db.properties with the credentials to your database.
  - If you are on a silicon mac, an older version of the MySQL community server may be required (8.0.36). A few revisions to your database and db.properties will be needed and can be found here at the end of this document.

## Getting Started

1. Using [npm](https://nodejs.org/en), install all the dependencies listed in package.json

```
npm install
```

2. Run DBConnect.js. This files creates a locally hosted server that listens on port 3000.

```
node DBConnect.js
```

### Interacting with the API

Raw JSON data from the MySQL database can be viewed in two ways. Make sure to replace "${searchTerm}" with your own query

1. Via terminal using curl

```
curl http://localhost:3000/api/v1/data?searchTerm=${searchTerm}
```

Or with pretty print

```
curl http://localhost:3000/api/v1/data?searchTerm=${searchTerm} | json_pp
```

2. Via browser by searching: http://localhost:3000/api/v1/data?searchTerm=${searchTerm}

## Dependencies

- **Bootstrap**
  Used to make the frontend look pretty.
- **JQuery**
  Used to manipulate HTML elements.
- **AJAX**
  Used to retrieve JSON data from the API.
- **Express**
  Used to create a locally hosted server.
- **MySQL**
  Used to store the data displayed on the website.
- **Properties Reader**
  Used to read database credentials from a data source.

#### DB and db.properties revisions

In order to connect to an older version of the MySQL community server, an update to the root users authentication plugin will need to be made.

1. **Access MySQL Command Line:** Open a terminal or command prompt and log in to your MySQL server using the command line. You may need to provide the MySQL root user's password when prompted.
2. **Update Root User's Authentication Plugin:** Once you're logged in to the MySQL server, execute the following SQL command to update the authentication plugin for the root user to `mysql_native_password`:

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
```

3. **Flush Privileges:** After updating the user account settings, it's a good practice to flush the privileges to apply the changes immediately:

```sql
    FLUSH PRIVILEGES;
```

4. **Check Authentication Plugin:** If you would like to see if the changes have been made, you can do so with this SQL command:

```sql
SELECT user, host, plugin FROM mysql.user;
```
