from django.db import models
from django.contrib.auth.models import User

# order model 
class Order(models.Model):
    SIZE_CHOICES = [
        ('large', 'Large'),
        ('medium', 'Medium'),
        ('small', 'Small'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    dog_breed = models.CharField(max_length=255)
    dog_age = models.PositiveSmallIntegerField()
    dog_size = models.CharField(choices=SIZE_CHOICES, max_length=10)
    rent_start = models.DateTimeField()
    rent_duration = models.IntegerField()
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.dog_breed} - {self.user.username}"