from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('api/authors/', views.authors_list, name='authors-list'),
    path('api/books/', views.books_list, name='books-list'),
]