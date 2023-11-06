# My Bookstore API

Welcome to the My Bookstore API repository! This API allows you to manage books and user authentication for your online bookstore. Below, you'll find information on the API endpoints, how to set up and run the application locally, and some of the decisions and assumptions made during the development process.

## API Endpoints and Usage

1. **User Signup**
   - Endpoint: `POST /api/auth/signup`
   - Usage: Register a new user.
   - Request body: 
     ```
     {
       "username": "your_name",
       "password": "your_password",
       "userId": "your_userid",
       "email": "your_email",
     }
     ```

2. **User Signin**
   - Endpoint: `POST /api/auth/signin`
   - Usage: Authenticate and sign in a registered user.
   - Request body:
     ```
     {
       "userId": "your_userid",
       "password": "your_password"
     }
     ```

3. **Add a Book**
   - Endpoint: `POST /api/book/add`
   - Usage: Add a new book to the bookstore's catalog.
   - Request body:
     ```
     {
       "title": "Book Title",
       "author": "Author Name",
       "ISBN": "The International Standard Book Number (ISBN) of the book",
       "publisher": "The publisher of the book"
       "price": 19.99,
       "language": "The language in which the book was written"
     }
     ```

4. **View All Books**
   - Endpoint: `GET /api/book/viewall`
   - Usage: Retrieve a list of all available books in the catalog.

5. **View a Book by ID**
   - Endpoint: `GET /api/book/viewbyid?id=your_book_id`
   - Usage: Retrieve details of a specific book by providing its unique ID.

6. **Update a Book by ID**
   - Endpoint: `PUT /api/book/updatebook?id=your_book_id`
   - Usage: Update the details of a specific book by providing its unique ID. You can modify the book's price, or any other details(can be added later).
   - Request body:
     ```
     {
       "price": 24.99
     }
     ```

7. **Delete a Book by ID**
   - Endpoint: `DELETE /api/book/deletebook?id=your_book_id`
   - Usage: Delete a specific book from the catalog by providing its unique ID.

## Instructions to Set Up and Run Locally

To set up and run the My Bookstore API locally, follow these steps:

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/yourusername/my-bookstore-api.git
   ```

2. Change the working directory to the project folder:

   ```
   cd my-bookstore-api
   ```

3. Install the required dependencies using your preferred package manager. For example, if you are using Node.js, you can run:

   ```
   npm install
   ```

4. Configure the database connection. Update the database credentials in the `config.js` or `.env` file if necessary.

5. Start the API server:

   ```
   npm start
   ```

6. The API should now be running locally on `http://localhost:8000`.

7. You can access the API using the provided endpoints, such as `http://localhost:8000/api/auth/signup` and `http://localhost:8000/api/book/add`, for user registration and book management.

## Decisions and Assumptions

During the development process, the following decisions and assumptions were made:

- **Database**: We assumed the use of a relational database to store user and book data. The configuration details for the database are stored in a configuration file.

- **Authentication**: The API uses username and password for user authentication. We recommend implementing additional security measures like JWT tokens and hashing passwords in a production environment.

- **Endpoint URLs**: The provided URLs are for a local development environment (localhost). In a production environment, these URLs would need to be updated.

- **Authorization**: Authorization and role-based access control for API endpoints were not explicitly mentioned. You may need to implement these features based on your project requirements.

- **Request and Response Formats**: The request and response formats for the endpoints follow typical RESTful API conventions. You can adjust these as needed.

Please make any necessary adjustments and enhancements to the API based on your specific project requirements and security considerations.

Feel free to reach out to us for any questions or support regarding this API. We hope it helps you build your online bookstore!