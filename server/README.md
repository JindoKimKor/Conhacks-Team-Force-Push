Certainly! I'll convert the OpenAPI specification into a GitHub README format. This will provide a clear, readable documentation for your User API directly in your repository.

# User API Documentation

## API Version: 1.0.0

This document outlines the endpoints and schemas for the User API.

## Table of Contents

1. [Endpoints](#endpoints)
   - [Get All Users](#get-all-users)
   - [Create a New User](#create-a-new-user)
   - [Get User by ID](#get-user-by-id)
   - [Update User by ID](#update-user-by-id)
   - [Delete User by ID](#delete-user-by-id)
2. [Schemas](#schemas)
   - [User](#user)
   - [NewUser](#newuser)
   - [Turtle](#turtle)

## Endpoints

### Get All Users

Retrieves all users.

- **URL:** `/api/users`
- **Method:** GET
- **Success Response:**
  - **Code:** 200
  - **Content:** Array of [User](#user) objects

### Create a New User

Creates a new user and associated turtle.

- **URL:** `/api/users`
- **Method:** POST
- **Request Body:** [NewUser](#newuser) object
- **Success Response:**
  - **Code:** 200
  - **Content:** 
    ```json
    {
      "user": User,
      "turtle": Turtle
    }
    ```

### Get User by ID

Retrieves a specific user by their ID.

- **URL:** `/api/users/{id}`
- **Method:** GET
- **URL Params:** 
  - `id`: String (required)
- **Success Response:**
  - **Code:** 200
  - **Content:** [User](#user) object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "User not found" }`

### Update User by ID

Updates a user's information.

- **URL:** `/api/users/{id}`
- **Method:** PUT
- **URL Params:**
  - `id`: String (required)
- **Request Body:** [NewUser](#newuser) object
- **Success Response:**
  - **Code:** 200
  - **Content:** Updated [User](#user) object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "User not found" }`

### Delete User by ID

Deletes a user by their ID.

- **URL:** `/api/users/{id}`
- **Method:** DELETE
- **URL Params:**
  - `id`: String (required)
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "User deleted successfully" }`
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "User not found" }`

## Schemas

### User

```json
{
  "email": "string (email format)",
  "name": "string",
  "points": "number",
  "profiles": {
    "experience": "number",
    "goals_assigned": ["string"],
    "goals_completed": "number",
    "items": [
      {
        "item_id": "string",
        "availability": "boolean"
      }
    ],
    "level": "number",
    "savedStreaks": "number",
    "sign_up_selections": {
      "commute_distance": "string (enum: '0-10 km', '10-30 km', '30-50 km', '50+')",
      "commute_type": "string (enum: 'Car', 'Bus', 'Walk', 'Bike')",
      "garbage_bags_biweekly": "string (enum: '0-2', '3-5', '6+')",
      "recycle_frequency": "string (enum: 'Never', 'Sometimes', 'Often', 'Always')"
    },
    "streaks": "number"
  }
}
```

### NewUser

```json
{
  "email": "string (email format, required)",
  "name": "string (required)",
  "password": "string (min length: 8, required)"
}
```

### Turtle

```json
{
  "emotionalState": "string (default: 'neutral')",
  "equipment": ["string"],
  "userId": "string"
}
```