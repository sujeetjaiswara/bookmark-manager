# Bookmark Manager

A modern web application for saving, organizing, and managing your bookmarks with advanced features.

## Features Roadmap

### Core Features

- [x] Bookmark creation
- [x] Edit functionality
- [x] Delete functionality
- [ ] Favorite bookmarks
- [ ] Metadata fetch when pasting links

### User Experience

- [ ] Searching
- [ ] Load more (pagination)
- [ ] Theme toggle
- [ ] Application settings

### User Management

- [ ] Login
- [ ] SignUp
- [ ] SignOut
- [ ] GitHub OAuth integration

### Analytics

- [ ] Dashboard

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/bookmark-manager.git

# Install dependencies
cd bookmark-manager
npm install

# Start the development server
npm run dev
```

## API Reference

### Bookmark Endpoints

- `GET /api/v1/bookmark/` - Get all bookmarks

  - Query parameters:
    - `limit` (optional): Number of bookmarks to return (default: 50)
    - `skip` (optional): Number of bookmarks to skip (default: 0)
    - `showDeleted` (optional): Include deleted bookmarks (default: false)

  Example: `http://localhost:3000/api/v1/bookmark/?limit=12&skip=2&showDeleted=true`

- `GET /api/v1/bookmark/:id` - Get a specific bookmark
- `POST /api/v1/bookmark/` - Create a new bookmark
- `PUT /api/v1/bookmark/:id` - Update a bookmark
- `DELETE /api/v1/bookmark/:id` - Delete a bookmark

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
