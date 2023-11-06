# My Bookstore API

Welcome to My Bookstore API repository! This API allows you to manage books and user authentication for your online bookstore. Below, you'll find information on the API endpoints, how to set up and run the application locally, and some of the decisions and assumptions made during the development process.

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
   git clone https://github.com/nil2022/bookstore.git
   ```

2. Change the working directory to the project folder:

   ```
   cd bookstore
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

Certainly, here's the revised "Decisions and Assumptions" section based on your description:

## Decisions and Assumptions

During the development process, the following decisions and assumptions were made:

- **User Registration**: User registration is assumed to involve collecting user information such as username, user ID, password, and email. This information is used to create user accounts in the system.

- **User Authentication**: To provide secure access, the API assumes user authentication. Registered users are required to sign in to the web app using their credentials.

- **JWT (JSON Web Tokens)**: For maintaining user sessions and ensuring secure access, the API utilizes JSON Web Tokens (JWT). This token-based authentication mechanism is used to verify the identity of users and ensure that they have access to the appropriate resources.

- **Endpoint URLs**: The provided endpoint URLs are designed to support user registration, authentication, and book management. You can adjust these endpoints as needed to meet your specific requirements.

- **Authorization**: While user authentication is implemented, explicit authorization and role-based access control for API endpoints are not mentioned. Depending on your project requirements, you may need to extend the API to include these features.

Please adapt the API and its authentication mechanisms to align with your project's security and access control needs. If you have any questions or need further assistance, feel free to reach out for support.

Certainly! Here's a README file for deploying your REST API on the Render cloud server:

# Deploying My Bookstore REST API on Render

This guide will walk you through the process of deploying your My Bookstore REST API on the Render cloud server. Render provides an easy and scalable platform for hosting web applications, making it a great choice for deploying your API.

## Prerequisites

Before you begin, make sure you have the following prerequisites:

1. A Render account: Sign up for an account at [Render](https://render.com/) if you don't already have one.

2. Your My Bookstore REST API codebase, which you plan to deploy.

## Deployment Steps in Render

Follow these steps to deploy your REST API on Render:

1. **Configure Your Repository:**

   Make sure your REST API code is hosted in a Git repository (e.g., GitHub). Render will deploy your application directly from your Git repository.

2. **Create a New Web Service:**

   - Log in to your Render account.
   - Click on "Create New" and then select "Web Service."

3. **Connect to Your Git Repository:**

   - Choose the Git repository that contains your API code.
   - Render will automatically detect the build command and the start command for your project if you have them set in your repository.

4. **Configure Environment Variables:**

   If your API relies on environment variables (e.g., database connection settings, JWT secrets), you can configure them in the Render dashboard under the "Environment Variables" section.

5. **Review and Deploy:**

   Double-check your settings and configurations. Then, click the "Create Web Service" button to initiate the deployment process.

6. **Deployment Status:**

   Render will build and deploy your API. You can monitor the deployment progress in the Render dashboard.

7. **Custom Domains (Optional):**

   If you have a custom domain for your API, you can set it up in the Render dashboard. Render provides HTTPS support and can automatically manage SSL certificates for your domains.

8. **Testing and Accessing Your API:**

   Once the deployment is complete, Render will provide a URL for your API. You can access your API using this URL. Test your API to ensure that it's functioning as expected.