from django.http import JsonResponse
from .models import Author, Book

def home(request):
    return JsonResponse({
        'message': 'Welcome to Django Docker API',
        'endpoints': {
            'authors': '/api/authors/',
            'books': '/api/books/',
        }
    })

def authors_list(request):
    authors = Author.objects.all()
    data = [
        {
            'id': author.id,
            'name': author.name,
            'email': author.email,
            'books_count': author.books.count()
        }
        for author in authors
    ]
    return JsonResponse({'authors': data})

def books_list(request):
    books = Book.objects.select_related('author').all()
    data = [
        {
            'id': book.id,
            'title': book.title,
            'author': book.author.name,
            'publication_date': book.publication_date,
            'isbn': book.isbn
        }
        for book in books
    ]
    return JsonResponse({'books': data})