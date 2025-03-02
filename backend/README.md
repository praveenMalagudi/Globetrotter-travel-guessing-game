# GlobeTrotter Backend

## Overview

The GlobeTrotter backend is built using Node.js, Express, and MongoDB. It serves as the API for the GlobeTrotter Travel Guessing App, providing endpoints for user authentication, dataset management, and invite functionalities.

## Features

- **User Authentication**: Secure user registration and login with JWT tokens.
- **Dataset Management**: CRUD operations for datasets, including clues and trivia.
- **Invite System**: Generate invite links for users to share with friends.
- **Error Handling**: Custom error handling for API responses.

## Installation

To set up the backend, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/praveenMalagudi/Globetrotter-travel-guessing-game
   ```

2. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create a `.env` file**: Copy the `.env.example` file and fill in the required environment variables.

5. **Run the development server**:

   ```bash
   npm run dev
   ```

   The server will start on the specified port (default is 5000).

## Usage

- The API is accessible at `http://localhost:5000/api/v1`.
- Use tools like Postman or Insomnia to test the API endpoints.

## API Endpoints

- **User Registration**: `POST /api/v1/users/register`
- **User Login**: `POST /api/v1/users/login`
- **Get Current User**: `GET /api/v1/users/current-user`
- **Refresh Token**: `POST /api/v1/users/refresh-token`
- **Get Dataset**: `GET /api/v1/datasets/:userId`
- **Check Quiz Answer**: `POST /api/v1/datasets/check-quiz-answer`
- **Invite Friend**: `POST /api/v1/invites/invite-friend`

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)
