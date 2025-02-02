# BharatFD - FAQ Management System

This is a RESTful API project for managing FAQs, which includes an admin-only CKEditor integration for creating and managing FAQs, and a public FAQ page that users can access to view FAQs in multiple languages using the Google Translation API.

## Tech Stack
- **MERN** (MongoDB, Express.js, React, Node.js)

## Features
- **Admin-only CKEditor Integration**: Admin users can create, edit, and delete FAQs.
- **Public FAQ Page**: Users can view FAQs in multiple languages with the Google Translation API.
- **Multilingual Support**: Translates FAQ content into different languages using Google Translation API.

## Login Credentials
- username : testing@123
- password : 123


## Getting Started

### 1. Clone the repository

- step 1:
 ```bash
  git clone https://github.com/itsnikhil24/BharatFD.git
  ```
- Step 2:
  ```bash
  cd BharatFD
  ```
- Step 3:
  ```bash
  npm install
  ```
- step 4: Go to the models/faq.js and replace this with your mongodb connection string
```bash
  mongoose.connect("Your connection string"); 
```
- Step 5:
 ```bash
  node .\index.js
  ```


## Access the Application
- Login Page: http://localhost:3000/login
   Users can log in from this page.

- FAQ Dashboard (Home Page): http://localhost:3000/
This is the public page where users can view FAQs.

- Admin Dashboard: http://localhost:3000/admindashboard
Admin users can log in here to manage FAQs using CKEditor.

# Multilingual FAQ apis:

- Hindi: http://localhost:3000/faqs/?lang=hi
- English: http://localhost:3000/faqs/?lang=en
- You can specify other languages by passing different language codes in the URL.


## Technologies Used
  - **Node.js**: JavaScript runtime for the backend server.
  - **Express.js**: Web framework for Node.js to build the RESTful API.
  - **MongoDB**: NoSQL database used to store FAQ data.
  - **Mongoose**: ODM (Object Data Modeling) library for MongoDB to interact with the database.
  - **bcrypt**: A library used for hashing passwords securely.
  - **Google Translation API**: Used to provide multilingual support for FAQs.
  - **CKEditor**: Rich text editor for managing FAQ content (available to admins only).

