
# Task Manager

## Overview

This project is a full-stack task management application consisting of two parts:
- **Frontend**: A React application located in the `frontend` directory.
- **Backend**: A Laravel API located in the `backend` directory.

The frontend communicates with the backend API to manage tasks, including creating, updating, and deleting tasks.

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (version >= 14)
- [Composer](https://getcomposer.org/) (version >= 2)
- [PHP](https://www.php.net/) (version >= 7.4)
- [MySQL](https://www.mysql.com/) or any other preferred database
- [Laravel](https://laravel.com/) (version >= 8)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Backend Setup (Laravel API)

1. **Navigate to the backend directory**:
    ```bash
    cd task-manager-api
    ```

2. **Install PHP dependencies**:
    ```bash
    composer install
    ```

3. **Set up the environment**:
    - Copy the `.env.example` file and rename it to `.env`:
      ```bash
      cp .env.example .env
      ```
    - Update your `.env` file with the appropriate database credentials and any other necessary environment variables.
    - Make sure to add `FRONTEND_URL=http://localhost:5173` since the frontend uses Vite for development.
    - Ensure the `APP_URL` is correctly set to your backend's local URL (e.g., `http://localhost:8000`).

4. **Run database migrations**:
    ```bash
    php artisan migrate
    ```

5. **Start the Laravel development server**:
    ```bash
    php artisan serve
    ```

### 3. Frontend Setup (React)

1. **Navigate to the frontend directory**:
    ```bash
    cd ../task-manager-frontend
    ```

2. **Install JavaScript dependencies**:
    ```bash
    npm install
    ```

3. **Start the React development server**:
    ```bash
    npm run dev
    ```

### 4. Open the Application

- **Frontend**: Access the React app by visiting `http://localhost:5173`.
- **Backend**: The Laravel API will be available at `http://localhost:8000` or as configured.

## Contributing

If you'd like to contribute to the project, feel free to submit a pull request. Please make sure all tests pass before submitting.
