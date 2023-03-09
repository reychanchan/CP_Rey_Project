from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user','dog_breed', 'dog_age', 'dog_size', 'rent_start', 'rent_duration', 'location', 'created_at']
        read_only_fields = ['created_at']