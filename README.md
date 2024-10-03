# Task Manager

## Overview
This project consists of two parts:
- **Frontend**: A React application located in the `frontend` directory.
- **Backend**: A Laravel API located in the `backend` directory.

## Prerequisites
Ensure you have the following installed on your system:
- Node.js (version >= 14)
- Composer (version >= 2)
- PHP (version >= 7.4)
- MySQL (or any other database you plan to use)
- Laravel (version >= 8)

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

### 2. Setup Backend
```bash
1. Navigate to the backend directoy: cd task-manager-api
2. Install PHP dependencies via composer: composer install
3. Setup the environment:
   a) Copy the env.example file and rename it into .env
   b) Update database credentials and other environment variables in the .env file ( make sure you setup the database earlier )
   c) Make sure to add FRONTEND_URL=http://localhost:5173 variable. We need this because we used vite for our frontend app.
   d) Also make sure that the APP_URL is correctly set
4. Run migrations: php artisan migrate
5. Start the server: php artisan serve
