# Only Auth

## Description
A project that allows users to sign up and log in to access the app's features.

## Technologies & Tools
- Node.js
- Next.js
- Auth.js
- Prisma
- tailwindcss
- shadcn/ui
- zod

## Features
- Sign up
- Log in with email and password or Google
- Log out
- Update user profile

## Installation
To install the project, follow the steps below:

setup the environment variables
- Create a `.env` file in the root directory
- Add the following environment variables to the `.env` file
    - `DATABASE_URL` - The URL of the database
    - `AUTH_SECRET` - The secret key for the authentication
    - `AUTH_GOOGLE_ID` - The client ID of the Google OAuth
    - `AUTH_GOOGLE_SECRET` - The client secret of the Google OAuth

```bash
# Clone the repository
git clone https://github.com/armthananon/only-auth.git

# Navigate to the project directory
cd only-auth

# Install dependencies
npm install

# Start the development server
npm run dev
```