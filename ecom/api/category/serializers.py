from rest_framework import serializers
from .models import Category

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        # field = ('name','description') # Not supporting after 3.3
        fields = '__all__'
