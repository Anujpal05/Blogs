# BlogPulse
Welcome to BlogPulse, a responsive web application where users can read blogs, write their own blogs, and manage their content with ease. This project is built using React, Redux Toolkit, JWT token for authentication, and Toastify for notifications.

## Features
**User Authentication:** Secure login and registration using JWT tokens.
**Read Blogs:** View blogs posted by other users.
**Write Blogs:** Create and publish your own blogs.
**Update and Delete:** Edit or delete your own blog posts.
**Responsive Design:** Ensures a seamless experience across different devices.

## Technologies Used
**React:** For building the user interface.
**Redux Toolkit**: For state management.
**JWT Token:** For secure user authentication.
**Toastify:** For displaying notifications.
**Axios:** For making API requests.
**Express:** For backend server.
**MongoDB:** For database.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Anujpal05/Blogs.git
    ```
2. Navigate to the project directory:
    ```bash
    cd Blog_App
    ```
3. Install dependencies for the frontend and backend:
    ```bash
    cd frontEnd
    npm install
    cd ../backEnd
    npm install
    ```
4. Create a `.env` file in the `backEnd` directory and add your environment variables:
    ```env
    MONGO_URL=your_mongo_db_uri
    JWT_SECRET=your_jwt_secret
    ```
5. Create a `.env` file in the `frontEnd` directory and add your environment variables:
    ```env
   VITE_SERVER_URL = backEnd_Url
    ``` 
6. Start the backend server:
    ```bash
    cd backEnd
    npm start
    ```
7. Start the frontend server:
    ```bash
    cd frontEnd
    npm run dev
    ```

## Usage
**Register:** Create a new account.
**Login:** Sign in with your credentials.
**Browse Blogs:** View blogs posted by other users.
**Create Blog:** Write and publish your own blog.
**Edit Blog:** Update your own blog posts.
**Delete Blog:** Remove your own blog posts.
**Notifications:** Receive toast notifications for various actions (e.g., login success, blog creation).

## Acknowledgments
Thank You for Vising this project.
