from django.db import models

# Main model - Author
class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    birth_date = models.DateField()
    bio = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

# First related model - Book
class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='books')
    publication_date = models.DateField()
    isbn = models.CharField(max_length=13, unique=True)
    pages = models.PositiveIntegerField()
    
    def __str__(self):
        return self.title

    class Meta:
        ordering = ['title']

# Second related model - Publisher
class Publisher(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=50)
    founded_year = models.PositiveIntegerField()
    website = models.URLField(blank=True)
    
    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

# Third related model - Review
class Review(models.Model):
    RATING_CHOICES = [
        (1, '1 Star'),
        (2, '2 Stars'),
        (3, '3 Stars'),
        (4, '4 Stars'),
        (5, '5 Stars'),
    ]
    
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reviews')
    reviewer_name = models.CharField(max_length=100)
    content = models.TextField()
    rating = models.IntegerField(choices=RATING_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Review for {self.book.title} by {self.reviewer_name}"

    class Meta:
        ordering = ['-created_at']