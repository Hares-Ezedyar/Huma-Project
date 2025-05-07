# HumaPress API Documentation

## Base URL
```
https://humapress.vercel.app/api
```

## Authentication
No authentication is required for the current version of the API.

## Endpoints

### Articles

#### Get All Articles
```
GET /articles
```
Returns a list of all articles, including both breaking news and quarantined content.

**Response**
```json
[
  {
    "id": "uuid",
    "source_name": "BBC Persian",
    "source_icon": "BBC",
    "title": "تحولات سیاسی جدید در افغانستان",
    "content": "لورم ایپسوم متن ساختگی...",
    "original_link": "https://www.bbc.com/persian/articles/example",
    "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "is_quarantined": false,
    "created_at": "2025-04-08T12:30:00Z",
    "reactions": [
      {
        "reaction_type": "like",
        "count": 24
      },
      {
        "reaction_type": "dislike",
        "count": 3
      }
    ]
  }
]
```

#### Get Breaking News
```
GET /articles/breaking
```
Returns a list of non-quarantined articles.

**Response**
Same format as `/articles` but only includes articles with `is_quarantined: false`.

#### Get Quarantined Articles
```
GET /articles/quarantine
```
Returns a list of quarantined articles (low sentiment score).

**Response**
Same format as `/articles` but only includes articles with `is_quarantined: true`.

### Moderation Logs

#### Get Moderation Logs
```
GET /moderation-logs
```
Returns a list of moderation actions with SHA-256 hashes of blocked content.

**Response**
```json
[
  {
    "id": "uuid",
    "article_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "reason": "Matched regex pattern [طالبان]",
    "created_at": "2025-04-08T15:45:00Z"
  }
]
```

### Reactions

#### Update Reaction
```
POST /reactions
```

**Request Body**
```json
{
  "article_id": "uuid",
  "reaction_type": "like" // or "dislike"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "count": 25
  }
}
```

### Evidence Upload

#### Upload Evidence
```
POST /upload-evidence
```

**Request Body**
```json
{
  "file_data": "base64_encoded_file_data",
  "description": "Description of the evidence"
}
```

**Response**
```json
{
  "success": true,
  "message": "File uploaded successfully"
}
```

## WebSocket Events

Connect to WebSocket at:
```
wss://humapress.vercel.app
```

### Events

#### New Article
```json
{
  "event": "new-article",
  "data": {
    // Article object (same format as GET /articles response)
  }
}
```

#### New Moderation Log
```json
{
  "event": "new-moderation-log",
  "data": {
    // Moderation log object (same format as GET /moderation-logs response)
  }
}
```

## Error Responses

All endpoints return standard HTTP status codes:

- `200 OK`: Request successful
- `400 Bad Request`: Invalid request parameters
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error response body:
```json
{
  "error": "Error message description"
}
```
