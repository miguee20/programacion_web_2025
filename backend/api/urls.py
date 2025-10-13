from django.urls import path
from . import views

urlpatterns = [
    path('hide/', views.hide_secret, name='hide_secret'),
    path('reveal/', views.reveal_secret, name='reveal_secret'),
]
