# Django Docker API - Homework 06

## Description

This project implements a RESTful API using Django and PostgreSQL, containerized with Docker.  
It was developed for Homework 06 of the course and meets all the required specifications.

**Important note:** Since I didn't complete Homework 05, this project includes both Homework 05 requirements (models and migrations) and Homework 06 requirements (Dockerization).

---

## Homework 06 - Docker

- Dockerfile without root user  
- Lightweight image using `python:3.11-slim`  
- Docker Compose with PostgreSQL service  
- Service dependencies with health checks  
- Migrations executed inside the container  
- Environment variables using a `.env` file  
- Persistent volumes for the database  

---

## Technology Stack

- **Backend:** Django 4.2.7  
- **Database:** PostgreSQL 15  
- **Containerization:** Docker + Docker Compose  
- **WSGI Server:** Gunicorn  
- **Python:** 3.11  

---

## How to Run

### Requirements

- Docker Desktop installed and running  
- Git  

### 1. Clone and prepare the project
```
git clone https://github.com/miguee20/programacion_web_2025.git
cd programacion_web_2025
git checkout hw-06
```

### 2. Environment setup

The `.env` file is already included with default values:
```
# Database
POSTGRES_DB=mydatabase
POSTGRES_USER=django_user
POSTGRES_PASSWORD=securepassword123

# Django
SECRET_KEY=django-insecure-change-this-in-production-12345
DEBUG=True
```

### 3. Build and start Docker containers
```
docker-compose up --build
```

### 4. Run migrations (open a new terminal)
```
docker-compose exec web python manage.py migrate
```

### 5. Create superuser
```
docker-compose exec web python manage.py createsuperuser
```
Follow the instructions to create an admin user.

### 6. Access the application

- Main API: http://localhost:8000/  
- Authors API: http://localhost:8000/api/authors/  
- Books API: http://localhost:8000/api/books/  
- Admin Panel: http://localhost:8000/admin/  

---

## Docker Configuration

### Dockerfile

- Base image: `python:3.11-slim`  
- Non-root user: `django`  
- Working directory: `/app`  
- Layered dependency installation  
- Security: runs as non-root user  

### docker-compose.yml

Includes:  
- **db:** PostgreSQL 15 with health checks  
- **web:** Django app with dependencies  

---

## API Endpoints

### GET /
```
{
  "message": "Welcome to Django Docker API",
  "endpoints": {
    "authors": "/api/authors/",
    "books": "/api/books/"
  }
}
```

### GET /api/authors/
Returns a list of authors with book count.

### GET /api/books/
Returns a list of books with author information.

---

## Models Implemented

### Author
- name (CharField)  
- email (EmailField, unique)  
- birth_date (DateField)  
- bio (TextField)  
- created_at (DateTimeField, auto)  

### Book
- title (CharField)  
- author (ForeignKey to Author)  
- publication_date (DateField)  
- isbn (CharField, unique)  
- pages (PositiveIntegerField)  

### Publisher
- name (CharField)  
- country (CharField)  
- founded_year (PositiveIntegerField)  
- website (URLField)  

### Review
- book (ForeignKey to Book)  
- reviewer_name (CharField)  
- content (TextField)  
- rating (IntegerField, choices 1-5)  
- created_at (DateTimeField, auto)  

---

## Useful Commands

### Development
```
# Run in background
docker-compose up -d

# View logs
docker-compose logs -f web

# Stop services
docker-compose down

# Open Django shell
docker-compose exec web python manage.py shell
```

### Database
```
# Create migrations
docker-compose exec web python manage.py makemigrations

# Apply migrations
docker-compose exec web python manage.py migrate

# Access PostgreSQL
docker-compose exec db psql -U django_user -d mydatabase
```

### Administration
```
# Create superuser
docker-compose exec web python manage.py createsuperuser

# Collect static files
docker-compose exec web python manage.py collectstatic
```

---

## Security Notes

- Non-root user in Docker container  
- Sensitive data stored in environment variables  
- PostgreSQL protected with password authentication  
- Debug mode can be turned off via environment variable  
