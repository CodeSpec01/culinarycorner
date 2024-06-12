# Culinary Corner

Welcome to Culinary Corner, your ultimate destination for a seamless and enjoyable dining experience. This project combines advanced web development techniques to provide users with a robust and secure platform for online table reservations, food ordering, and profile management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Custom Authentication**: Login, signup, and profile management system with the freedom to change profile picture and details.
- **Online Table Reservation**: Effortlessly book your favorite dining spot online.
- **Online Food Ordering**: Order your favorite dishes from the comfort of your home.
- **Two-Factor Authentication**: Enhanced security with OTP on email at every important step.
- **Light and Dark Theme**: User-friendly interface with light and dark theme options powered by ShadCN UI.
- **Secure Data Management**: JWT for secure tokenization and bcrypt for safe password management.
- **Robust Database**: MongoDB for efficient data storage and retrieval.
- **TypeScript**: Ensuring low bugs in code for a smoother development experience.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, ShadCN UI
- **Backend**: Next.js
- **Database**: MongoDB
- **Authentication**: JWT, bcrypt
- **Two-Factor Authentication**: NodeMailer for email OTP
- **Styling**: CSS, ShadCN
- **Hosting**: Vercel

## Installation

To get started with Culinary Corner, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/CodeSpec01/culinarycorner.git
   cd culinary-corner
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:

   ```env
   MONGODB_URI = your environment value
   JWT_SECRET = your environment value
   EMAIL_ID = your environment value
   EMAIl_PASSWORD = your environment value
   NEXT_CLOUDINARY_CLOUD_NAME = your environment value
   NEXT_CLOUDINARY_API_KEY = your environment value
   NEXT_CLOUDINARY_API_SECRET = your environment value
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Visit `http://localhost:3000` to see the application in action.

## Usage

### User Authentication

- **Signup/Login**: Users can create an account or log in to access their profiles.
- **Profile Management**: Users can update their profile picture and details.
- **Two-Factor Authentication**: Users receive an OTP via email for all critical actions.

### Table Reservation

- **Reserve a Table**: Users can book a table at their preferred time and date depending upon availability in the restaurant.

### Food Ordering

- **Order Food**: Users can browse the menu, select dishes, and place orders online.

## API Endpoints

### Authentication

- **POST /api/user/signup**: Create a new user account.
- **POST /api/user/login**: Authenticate a user and return a JWT.
- **GET /api/user/(login/signup)**: Send OTP to user’s email for two-factor authentication.

### Profile

- **GET /api/user/profile**: Retrieve user profile details.
- **POST /api/user/profile**: Update user profile details.

### Reservations

- **POST /api/reservation**: Make a new table reservation.
- **GET /api/reservation**: Check availability for reservations.

### Orders

- **POST /api/order**: Place a new food order.
- **GET /api/order**: Retrieve user data and initiate order verification.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.
