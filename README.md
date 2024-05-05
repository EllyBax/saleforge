# SaleForge

SaleForge is a web application designed to record and manage sales data efficiently. Built with Node.js and Express for the backend, it leverages PostgreSQL for data storage and EJS for dynamic content rendering. The application supports user authentication, session management, and provides a responsive design for an optimal user experience across various devices.

## Features

- User Authentication: Sign up, log in, and log out.
- Business Oriented: Users can own multiple businesses.
- Sales Data Management: Users can add, view, and delete sales records.
- Responsive Design: Supports both light and dark themes, adapting to user's system preferences.
- Session Management: Utilizes express-session for managing user sessions securely.

## Technologies Used

- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Frontend**: EJS, CSS
- **Other Libraries**: argon2 for password encryption, prisma for database ORM, dotenv for environment variable management.

## Getting Started

### Prerequisites

- Node.js
- Prisma

### Installation

1. Clone the repository:`git clone [https://github.com/EllyBax/saleforge.git](https://github.com/EllyBax/saleforge.git)`
2. Navigate into the folder: `cd saleforge`
3. Install dependencies:`npm install`
4. Set up your PostgreSQL database and update the connection details in the `.env` file.
5. Start the application:`npm run devStart`

## Usage

Navigate to `http://localhost:3000` to access SaleForge. Start by signing up for an account, setup your business, then log in to begin managing your sales data.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
