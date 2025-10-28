# Notes CRUD API

A simple RESTful API for managing notes with in-memory storage, built as part of the backend developer assessment.

## Features

- **CRUD Operations**: Create, Read, Update, Delete notes
- **In-Memory Storage**: No database required
- **Structured Logging**: Comprehensive request/response logging
- **Error Handling**: Proper error responses with status codes
- **Input Validation**: Request validation and sanitization

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/notes` | Create a new note |
| `GET` | `/api/notes` | Retrieve all notes |
| `GET` | `/api/notes/:id` | Retrieve a specific note by ID |
| `PUT` | `/api/notes/:id` | Update a note by ID |
| `DELETE` | `/api/notes/:id` | Delete a note by ID |
| `GET` | `/api/notes/stats` | Get notes statistics |

## Request/Response Format

### Create Note
```bash
POST /api/notes
Content-Type: application/json

{
  "title": "My Note Title",
  "content": "Note content here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "title": "My Note Title",
    "content": "Note content here",
    "createdAt": "2024-01-01T12:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### Get All Notes
```bash
GET /api/notes
```

**Response:**
```json
{
  "success": true,
  "message": "Notes retrieved successfully",
  "count": 2,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "title": "My Note Title",
      "content": "Note content here",
      "createdAt": "2024-01-01T12:00:00.000Z",
      "updatedAt": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

### Update Note
```bash
PUT /api/notes/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

### Delete Note
```bash
DELETE /api/notes/550e8400-e29b-41d4-a716-446655440000
```
## Testing the API

### Manual Testing with curl

1. **Create a note:**
   ```bash
   curl -X POST http://localhost:3099/api/notes \
     -H "Content-Type: application/json" \
     -d '{"title": "Test Note", "content": "This is a test note"}'
   ```

2. **Get all notes:**
   ```bash
   curl http://localhost:3099/api/notes
   ```

3. **Get a specific note:**
   ```bash
   curl http://localhost:3099/api/notes/550e8400-e29b-41d4-a716-446655440000
   ```

4. **Update a note:**
   ```bash
   curl -X PUT http://localhost:3099/api/notes/550e8400-e29b-41d4-a716-446655440000 \
     -H "Content-Type: application/json" \
     -d '{"title": "Updated Note", "content": "Updated content"}'
   ```

5. **Delete a note:**
   ```bash
   curl -X DELETE http://localhost:3099/api/notes/550e8400-e29b-41d4-a716-446655440000
   ```

6. **Get statistics:**
   ```bash
   curl http://localhost:3099/api/notes/stats
   ```

### Using Postman

Point your Postman environment to the following endpoints:

- **Base URL:** `http://localhost:3099/api/notes`
- **Headers:** `Content-Type: application/json` (for POST/PUT requests)

## Project Structure

```
contracts/
├── controllers/
│   └── noteController.js      # Notes CRUD operations
├── models/
│   └── Note.js               # In-memory notes model
├── routes/
│   └── noteRoute.js          # Notes API routes
├── middlewares/
│   └── helpers/
│       └── requestLogger.js  # Request logging middleware
├── utils/
│   └── logger.js            # Structured logging utility
├── app.js                   # Express app configuration
└── server.js               # Server entry point
```

## Logging

The API includes comprehensive structured logging:

- **Request Logging**: All incoming requests with method, URL, IP, response time
- **Response Logging**: API responses with status codes and data
- **Error Logging**: Detailed error information with stack traces
- **Color-coded Output**: Easy-to-read console output with colors

## Error Handling

The API handles various error scenarios:

- **404 Not Found**: When trying to access non-existent notes
- **400 Bad Request**: When request data is invalid, missing, or UUID format is invalid
- **500 Internal Server Error**: For unexpected server errors

All errors return a consistent JSON format:
```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 404
}
```

## Validation Rules

- Notes must have either a `title` or `content` (or both)
- Empty requests are rejected with appropriate error messages
- All fields are optional but at least one must be provided
- UUID format is validated for all operations requiring an ID parameter

## Notes

- Data is stored in memory and will be lost when the server restarts
- IDs are generated using UUID v4 format (e.g., `550e8400-e29b-41d4-a716-446655440000`)
- Timestamps are automatically managed (createdAt, updatedAt)
- The API follows RESTful conventions
- All responses include a consistent structure with `success`, `message`, and `data` fields
