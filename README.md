# API Documentation

## API Endpoints

### Register
- **URL:** `/api/v1/auth/register`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required)
  - `password` (string, required)
- **Response:**
  - `201 Created`
  - `400 Bad Request` if the user already exists or validation fails

### Login
- **URL:** `/api/v1/auth/login`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required)
  - `password` (string, required)
- **Response:**
  - `200 OK`
  - `400 Bad Request` if the user is not found or password does not match

### Test Authentication
- **URL:** `/api/v1/auth/test`
- **Method:** `GET`
- **Middleware:** `authenticate`
- **Response:**
  - `200 OK` if the user is authenticated
  - `401 Unauthorized` if the user is not authenticated

## Error Handling
Errors are handled globally using the `errorHandler` middleware in `errorHandler.ts`. Custom errors are created using the `AppError` class in `AppError.ts`.

## Utilities

### Bcrypt
Password hashing and comparison utilities are provided in `bcrypt.ts`.

### JWT
JWT generation and verification utilities are provided in `jwt.ts`.

### Date
Common date utilities are provided in `date.ts`.

## Constants
HTTP status codes and environment variables are defined in `http.ts` and `env.ts` respectively.

## Prisma
Prisma client configuration is in `prisma.ts`.

