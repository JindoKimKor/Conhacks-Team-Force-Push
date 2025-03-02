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

---

# Turtle API Documentation

## Table of Contents

1. [Schemas](#schemas)
   - [Turtle](#turtle)
2. [Endpoints](#endpoints)
   - [Get Turtle by User ID](#get-turtle-by-user-id)
   - [Update All Turtles' Emotional States](#update-all-turtles-emotional-states)
3. [Emotional State Calculation](#emotional-state-calculation)

## Schemas

### Turtle

```json
{
  "emotionalState": {
    "type": "string",
    "enum": ["happy", "sad", "neutral", "excited"],
    "default": "neutral"
  },
  "equipment": {
    "type": "array",
    "items": "string",
    "default": []
  },
  "userId": {
    "type": "ObjectId",
    "ref": "User",
    "required": true,
    "unique": true
  }
}
```

## Endpoints

### Get Turtle by User ID

Retrieves a turtle associated with a specific user ID.

- **URL:** `/api/turtles/:userId`
- **Method:** GET
- **URL Params:**
  - `userId`: String (required)
- **Success Response:**
  - **Code:** 200
  - **Content:** [Turtle](#turtle) object
- **Error Response:**
  - **Code:** 404
  - **Content:** `{ "message": "Turtle not found" }`
  - **Code:** 500
  - **Content:** `{ "message": "Error message" }`

### Update All Turtles' Emotional States

Updates the emotional states of all turtles based on their associated users'
streaks.

- **URL:** `/api/turtles/update-all-emotional-states`
- **Method:** POST
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ "message": "All emotional states updated successfully." }`
- **Error Response:**
  - **Code:** 500
  - **Content:** `{ "message": "Error message" }`

## Emotional State Calculation

The emotional state of a turtle is calculated based on the user's streaks and
saved streaks. The possible emotional states are: "sad", "neutral", "happy", and
"excited".

### Logic:

1. If the current streaks are greater than the saved streaks and greater than 0:
   - The emotional state improves by one level (e.g., "neutral" to "happy").
2. If the streaks are not maintained (current streaks < saved streaks or both
   are 0):
   - The emotional state degrades by one level (e.g., "happy" to "neutral").

### Process:

1. For each user:
   - Update the saved streaks to the current streaks value.
   - If streaks haven't changed, reset both streaks and saved streaks to 0.
   - Calculate the new emotional state for the associated turtle.
   - Update the turtle's emotional state in the database.

This process ensures that the turtles' emotional states reflect the users'
recent activity and streak maintenance.
