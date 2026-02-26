# Lead Management System

A comprehensive Lead Management application built with Laravel, Inertia.js, and React. This system provides full CRUD functionality for managing leads with advanced features including search, filtering, sorting, and policy-based authorization.

## Features

- **Authentication System**: User registration, login, and logout
- **Lead Management**: Complete CRUD operations (Create, Read, Update, Delete)
- **Advanced Search**: Search leads by name and email
- **Status Filtering**: Filter leads by status (New, Contacted, Converted)
- **Date Sorting**: Sort leads by creation date (newest/oldest first)
- **Policy-Based Authorization**: Role-based access control for edit/delete operations
- **Responsive Design**: Modern UI with Tailwind CSS
- **Real-time Updates**: Debounced search and filter functionality
- **Pagination**: Efficient data handling with pagination

## Technology Stack

### Backend
- **Laravel 10.x**: PHP Framework
- **MySQL**: Database
- **Eloquent ORM**: Database Operations
- **Laravel Policies**: Authorization System

### Frontend
- **React 18.x**: UI Library
- **Inertia.js**: SPA Router
- **Tailwind CSS**: Styling Framework
- **Lucide Icons**: Icon Library

## System Requirements

### PHP Version
- **PHP 8.1+** (Recommended: PHP 8.2)
- Required Extensions:
  - `pdo_mysql`
  - `mbstring`
  - `xml`
  - `ctype`
  - `iconv`
  - `tokenizer`
  - `bcmath`
  - `json`
  - `fileinfo`

### Node.js Version
- **Node.js 18.x+** (Recommended: Node.js 20.x)
- **npm 9.x+** or **yarn 1.22.x+**

### Database
- **MySQL 8.0+** or **MariaDB 10.3+**

## Setup Steps

### 1. Clone the Repository
```bash
git clone https://github.com/ShibinBiju/lead_management.git
cd lead_management
```

### 2. Install Dependencies

#### Backend Dependencies
```bash
composer install
```

#### Frontend Dependencies
```bash
npm install
```

### 3. Environment Configuration
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Database Setup

#### Configure Database in `.env`
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=lead_management
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### Create Database
```sql
CREATE DATABASE lead_management;
```

### 5. Database Migrations
```bash
php artisan migrate
```

**Database Migrations Included:**
- `create_users_table`: User authentication system
- `create_password_resets_table`: Password reset functionality
- `create_sessions_table`: Session management
- `create_cache_table`: Application caching
- `create_leads_table`: Lead management with:
  - `id`: Primary key
  - `user_id`: Foreign key to users table
  - `name`: Lead name
  - `email`: Lead email (unique)
  - `phone`: Lead phone number
  - `status`: Lead status (New, Contacted, Converted)
  - `deleted_at`: Soft delete support
  - `created_at`, `updated_at`: Timestamps

### 6. Link Storage
```bash
php artisan storage:link
```

### 7. Compile Frontend Assets
```bash
npm run dev
```

For production:
```bash
npm run build
```

### 8. Start Development Server
```bash
php artisan serve
```

The application will be available at `http://localhost:8000`

## Default User

For testing purposes, you can create a user through the registration page or use the following command:

```bash
php artisan tinker
User::create([
    'name' => 'Test User',
    'email' => 'test@example.com',
    'password' => Hash::make('password')
]);
```

## Application Structure

### Backend Structure
```
app/
├── Http/
│   ├── Controllers/
│   │   ├── Auth/
│   │   │   ├── AuthenticatedSessionController.php
│   │   │   ├── RegisteredUserController.php
│   │   │   └── ...
│   │   └── LeadController.php
│   └── Middleware/
├── Models/
│   ├── User.php
│   └── Lead.php
├── Policies/
│   └── LeadPolicy.php
└── Providers/
    └── AuthServiceProvider.php
```

### Frontend Structure
```
resources/js/
├── Pages/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   └── Leads/
│       ├── Index.jsx
│       ├── Create.jsx
│       └── Edit.jsx
├── Layouts/
│   └── AuthenticatedLayout.jsx
└── Components/
```

## API Endpoints

### Authentication
- `GET /login` - Login page
- `POST /login` - Authenticate user
- `POST /logout` - Logout user
- `GET /register` - Registration page
- `POST /register` - Register new user

### Lead Management
- `GET /leads` - List leads with search, filter, and sort
- `GET /leads/create` - Create lead form
- `POST /leads` - Store new lead
- `GET /leads/{lead}/edit` - Edit lead form
- `PUT /leads/{lead}` - Update lead
- `DELETE /leads/{lead}` - Delete lead

## Authorization System

### Lead Policy Rules
- **View Any**: All authenticated users
- **View**: All authenticated users
- **Create**: All authenticated users
- **Update**: Only lead creator (configurable)
- **Delete**: Only lead creator (configurable)

### Frontend Authorization
- Edit/Delete buttons are disabled for unauthorized users
- Alert messages display when access is denied
- Visual feedback with grayed-out buttons

## Development Time

**Total Time to Complete**: ~4-6 hours

### Breakdown:
- **Initial Setup**: 30 minutes
- **Authentication System**: 1 hour
- **CRUD Operations**: 1.5 hours
- **Search & Filter Implementation**: 1 hour
- **Policy-Based Authorization**: 45 minutes
- **UI/UX Improvements**: 45 minutes
- **Testing & Debugging**: 30 minutes

## Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Lead creation, editing, and deletion
- [ ] Search functionality (name and email)
- [ ] Status filtering
- [ ] Date sorting (ascending/descending)
- [ ] Pagination
- [ ] Authorization restrictions
- [ ] Responsive design on mobile devices
- [ ] Error handling and validation

### Automated Testing (Future Enhancement)
```bash
# Run tests (when implemented)
php artisan test

# Run specific test
php artisan test --filter LeadTest
```

## Production Deployment

### Environment Setup
```bash
# Install production dependencies
composer install --optimize-autoloader --no-dev
npm install --production

# Optimize application
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set production environment
APP_ENV=production
APP_DEBUG=false
```

### Web Server Configuration

#### Apache (.htaccess)
```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

#### Nginx
```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please open an issue in the GitHub repository.

---

**Note**: This application was developed as a demonstration of modern web development practices using Laravel, React, and Inertia.js.
